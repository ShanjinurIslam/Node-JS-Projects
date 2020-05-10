const fs = require('fs')

const getNotes = function () {
    return "Your Notes...";
}

const addNote = (title, body) => {
    const notes = loadNotes()

    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title == title
    // })

    const duplicateNotes = notes.filter((note) => note.title == title)


    if (duplicateNotes.length == 0) {
        notes.push({ title: title, body: body })
        saveNotes(notes)
        console.log('New note added')
    }
    else {
        console.log("Duplicate note title found")
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter((note) => note.title != title)
    if (filteredNotes.length == notes.length) {
        console.log('Title not found')
    }
    else {
        saveNotes(filteredNotes)
        console.log('Note deleted sucessfully')
    }
}

const saveNotes = (notes) => {
    const json = JSON.stringify(notes)
    fs.writeFileSync('notes.json', json)
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.filter((note)=>note.title==title)
    return note
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

module.exports = { getNotes: getNotes, addNote: addNote, removeNote: removeNote,loadNotes:loadNotes,readNote:readNote }
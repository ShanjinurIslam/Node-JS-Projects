const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')
const noteUtils = require('./notes')

yargs.version('1.0')

yargs.command({
    command: 'add', describe: 'Add new note', builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    }, handler: function (argv) {
        noteUtils.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove', describe: 'Remove note', builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    }, handler: function (argv) {
        noteUtils.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read', describe: 'Read note', builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    }, handler: function (argv) {
        const note = noteUtils.readNote(argv.title)
        console.log(note)
    }
})

yargs.command({
    command: 'list', describe: 'List notes', handler: function () {
        const notes = noteUtils.loadNotes()
        console.log(chalk.green.bold("Your Notes"))
        notes.forEach(element => {
            console.log(element.title)
        });
    }
})

yargs.parse()


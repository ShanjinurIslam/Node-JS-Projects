const fs = require('fs')

// const book = { title: 'Debi', author: 'Humayun Ahmed' }

// const json = JSON.stringify(book)
// fs.writeFileSync('1-json.json',json)

const dataBuffer = fs.readFileSync('1-json.json')
json = dataBuffer.toString()
const person = JSON.parse(json)

person.name = 'Shanjinur'
person.age = 24

console.log(person)

fs.writeFileSync('1-json',JSON.stringify(person))
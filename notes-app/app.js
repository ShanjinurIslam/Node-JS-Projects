const validator = require('validator')
const getNotes = require('./notes')

console.log(getNotes())
console.log(validator.isEmail('spondoncsebuet@gmail.com'))
console.log(validator.isURL('https://www.google.com'))
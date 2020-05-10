const validator = require('validator')
const chalk = require('chalk')
const getNotes = require('./notes')

console.log(getNotes())
const flag = validator.isURL('http://www.google.com');

if(flag){
    console.log('Is Url? ' +String(chalk.bold.inverse.green(flag)))
}
else{
    console.log('Is Url? ' +String(chalk.bold.red(flag)))
}

console.log(chalk.green.bold.inverse('Success'))

console.log(chalk.red('Md. Shanjinur Islam'))

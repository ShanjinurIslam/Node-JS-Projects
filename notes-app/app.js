const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')

const command = process.argv[2]

yargs.version('1.0')

// add,remove,read,list

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
        console.log('Title: ' + argv.title)
        console.log('Body: ' + argv.body)
    }
})

yargs.command({
    command: 'remove', describe: 'Remove note', handler: function () {
        console.log('Removing new note');
    }
})

yargs.command({
    command: 'read', describe: 'Read note', handler: function () {
        console.log('Reading notes');
    }
})

yargs.command({
    command: 'list', describe: 'List notes', handler: function () {
        console.log('Listing notes');
    }
})

yargs.parse()


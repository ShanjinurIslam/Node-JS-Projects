//this file contains all CRUD Operations

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log(error)
    }

    const db = client.db(databaseName)

    //db.collection('users').insertOne({ username: 'shanjinur', age: 25 })

    //const updatePromise = db.collection('users').updateOne({ username: 'Imtiaz' }, { $set: { username: 'snigdho' }, $inc: { age: -1 } })

    //updatePromise.then((result) => { console.log(result) }).catch((error) => { console.log(error) })

    //create
    db.collection('tasks').insertOne({ description: 'Clean the house', completed: true })
    db.collection('tasks').insertOne({ description: 'Renew the inspection', completed: false })
    db.collection('tasks').insertOne({ description: 'Pot plants', completed: false })

    //read
    db.collection('tasks').find({ completed: true }).toArray((error, result) => {
        console.log(result)
    })

    //UPDATE
    db.collection('tasks').updateMany({ completed: false }, { $set: { completed: true } }).then((result) => { console.log(result) }).catch((error) => { console.log(error) })

    //DELETE
    db.collection('tasks').deleteMany({ completed: true }).then((result) => { console.log(result) }).then((error) => { console.log(error) })
})
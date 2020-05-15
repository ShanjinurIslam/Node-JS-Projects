const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

/*
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})

const newTask = new Task({
    description: "Feed the dogs",
    completed: false
})

newTask.save().then(() => {
    console.log(newTask)
}).catch((e) => {
    console.log(e)
})
*/
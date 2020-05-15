const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mangoose')
const User = require('./models/user')
const Task = require('./models/task')

// path setup
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// express configuration

const app = express()

app.use(express.json())
app.use(express.static(publicPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// request response section

app.get('', (req, res) => {
    return res.render('index', { title: 'Home', active: { home: true } })
})

app.post('/users', (req, res) => {
    const new_user = new User(req.body)
    new_user.save().then(() => {
        res.status(201).send(new_user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/tasks', (req, res) => {
    const new_task = new Task(req.body)
    new_task.save().then(() => {
        res.status(201).send(new_task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((result) => {
        res.status(201).send(result)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        if (!user) {
            res.status(404).send()
        }
        res.status(200).send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((result) => {
        res.status(201).send(result)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id).catch((task) => {
        if (!task) {
            res.status(404).send()
        }
        res.status(201).send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// starting listeing

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
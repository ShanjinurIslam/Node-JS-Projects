const path = require('path')
const express = require('express')
const hbs = require('hbs')
const User = require('./models/user')
const Task = require('./models/task')

require('./db/mangoose')

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

app.post('/users', async(req, res) => {
    const new_user = new User(req.body)
    try {
        const user = await new_user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(500).send(e)
    }
})


app.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.status(201).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/users/:id', async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'password', 'email']

    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        return res.status(404).send()
    }

    try {
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/tasks', async(req, res) => {
    const new_task = new Task(req.body)
    try {
        await new_task.save()
        res.status(201).send(new_task)
    } catch (e) {
        res.status(404).send(e)
    }
})

app.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/tasks/:id', async(req, res) => {
    const id = req.params.id

    try {
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).send()
        }
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})


app.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']

    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        return res.status(404).send()
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

app.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


app.get('', (req, res) => {
    return res.render('index', { title: 'Home', active: { home: true } })
})

// starting listeing

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
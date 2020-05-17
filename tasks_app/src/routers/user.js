const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async(req, res) => {
    const new_user = new User(req.body)
    try {
        await new_user.save()
        res.status(201).send(new_user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/tasks', async(req, res) => {
    const new_task = new Task(req.body)
    try {
        await new_task.save()
        res.status(201).send(new_task)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({})
        res.status(201).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id', async(req, res) => {
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

router.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'password', 'email']

    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        return res.status(404).send()
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/:id', async(req, res) => {
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

module.exports = router
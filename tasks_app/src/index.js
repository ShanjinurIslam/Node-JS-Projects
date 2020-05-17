const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mangoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// path setup
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// express configuration

const app = express()

app.use(userRouter)
app.use(taskRouter)
app.use(express.json())
app.use(express.static(publicPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// request response section

app.get('', (req, res) => {
    return res.render('index', { title: 'Home', active: { home: true } })
})

// starting listeing

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
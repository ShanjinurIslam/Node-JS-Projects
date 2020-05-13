const path = require('path')
const express = require('express')
const hbs = require('hbs')
const utils = require('./utils')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', { title: 'Weather App', weather: 'Rainy', location: "Dhaka", active: { home: true } })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About me!', name: 'Shanjinur Islam', active: { about: true } })
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', example: 'What to do if service is unavailable?', active: { help: true } })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ 'error': 'Address is blank' })
    }
    utils.geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ 'error': error })
        } else {
            utils.weather(data.lat, data.long, (error, data) => {
                if (error) {
                    return res.send({ 'error': error })
                } else {
                    //console.log(data.current) can be extended
                    return res.send({ icon: data.current.weather_icons[0], temperature: data.current.temperature, forecast: data.current.weather_descriptions[0], location: req.query.address })
                }
            })
        }
    })
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
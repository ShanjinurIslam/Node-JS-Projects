const utils = require('./utils')

const address = process.argv[2]


utils.geocode(address, (error, data) => {
    if (error) {
        console.log(error)
    } else {
        utils.weather(data.lat, data.long, (error, data) => {
            if (error) {

            } else {
                console.log(data.current)
            }
        })
    }
})
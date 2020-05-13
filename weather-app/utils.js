const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hhbmppbnVyIiwiYSI6ImNrYTJxNWxmZDA1dW4zbWxtZ3Bhc2tyNG0ifQ.iJraz1iVL4TBJq0Lyt3ZrA&limit=1';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(error, undefined)
        } else {
            const data = {
                place_name: response.body.features[0].place_name,
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
            }
            callback(error, data)
        }
    })
}

const weather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=616fde5ce60424825a81e3f75f97139a&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(error, undefined)
        } else {
            callback(undefined, response.body)
        }
    })
}

module.exports = { geocode: geocode, weather: weather }
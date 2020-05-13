/*
fetch('http://localhost:3000/weather?address=Dhaka').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})*/


const weatherInput = document.getElementById('myInput')
const forecastDiv = document.getElementById('forecast')

forecastDiv.innerHTML = ''


weatherInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        forecastDiv.innerHTML = '<h3>Loading...<h3>'
        const location = weatherInput.value
        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                forecastDiv.innerHTML = 'Forecast of ' + data.location + '<br/> <h3> Currently it is ' + data.forecast + ' </h3><img src=\"' + data.icon + ' \"' + '<br/><br/>  Temperature <b>' + data.temperature + '&#8451;</b>'
            })
        })
    }
});
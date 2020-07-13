const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=874c5fa145cff1ab37f28d95bb2843e8&query=37.8267,-122.4233&units=f';

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=874c5fa145cff1ab37f28d95bb2843e8&query=' + longitude + ',' + latitude + '&units=f';

    request({url, json: true}, (error, {body} = {}) => {
        if(error) { 
            callback('Unable to connect to location services!', undefined);
        } else if (body.success === false) {
            callback('Unable to find coordinates. Try other coordinates', undefined);
        } else {
            callback(undefined, {
                location: body.location.name + ', ' + body.location.region + ', ' + body.location.country,
                temperature: body.current.temperature,
                weather_descriptions: body.current.weather_descriptions[0],
                humidity: body.current.humidity
            })
        }
    }) 
}

module.exports = forecast;
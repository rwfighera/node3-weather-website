const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials'); // path of the partials

// Used to configure the page
app.set('view engine', 'hbs'); // let the server know that hbs is the view engine
app.set('views', viewsPath); // changes the views directory name for somethig else
hbs.registerPartials(partialsPath); // let the server know where the partials are

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => { // '' becase it's the root
    res.render('index', { // index without .hbs
        title: 'Weather App', // you pass an object with all the dynamic content 
        name: 'Andrew Mead'
    }); // no need for file extension
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { // destructuring. the = {} is a default value we are assigning in case there is an error. Is there is an error only ver variable error will come back and the variable response will be undefined and you can't unstructure from undefined.
        if(req.query.address === undefined) {
            return res.send({
                error: 'No value passed.'
            })
        }
        
        if(error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: req.query.address,
            });
        })
    })


});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});
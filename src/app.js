const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const request = require('request');


// Seting up express application
const app = express();
let port = process.env.PORT || 3000

// Set up a statci  path 
const viewPath = path.join(__dirname, '../templates/views');
app.use(express.static(path.join(__dirname, '../public')))

// Setup view engine  
app.set('views', viewPath)
app.set('view engine', 'hbs');

// Register partials
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Delight Deligad'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'Get some usefull help here',
        title: 'Help Page',
        name: 'Delight Deligad'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Delight Deligad'
    })
})

// Weather routes
app.get('/weather', (req, res) => {    
    if(!req.query.address){
        return res.send({
            error: 'An error occured pls try a search first'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error:error})
        }
           
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location: location, 
                address: req.query.address
            })
        })
    
    })  



})







// Testing product routes
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'An error occured pls try a search first'
        })
    }

    res.send({
        products: []

    })
})




// error 404 handling ***************
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gabriel Delight',
        errorMsg: 'Can not get help article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gabriel Delight',
        errorMsg: '404 page not found'
    })
})



app.listen(port, ()=> {
    console.log('Server suns on port ' + port)
})
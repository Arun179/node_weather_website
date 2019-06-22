const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup hbs engine and viewes location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arun Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name:  'Arun Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'Just type your location in search bar on Weather tab and hit enter!',
        title: 'Help',
        name: 'Arun Kumar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
             error: 'You must provide an address!'
         })
     }
     geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if(error)
        {
           return res.send({error: error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({error})
            }
            return res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
          }) 
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404',{
        errorMessage: 'Help article not found',
        title: 404,
        name: 'Arun Kumar'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: 'Page not found',
        title: 404,
        name: 'Arun Kumar'
    })
})

app.listen(port, () => {
    console.log('Server is running on port' + port)
})



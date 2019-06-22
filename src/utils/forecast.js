const request = require('request')

const forecast = (lat, long, callback) => {
 const url = 'https://api.darksky.net/forecast/1cbc36562a620e631d4a58c3cbe914a6/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=si'
 request({url, json: true}, (err,res) => {
    const { error, daily, currently} = res.body
     if(err)
     {
         callback('Unable to connect to weather service!')
     }
     else if (error)
     {
         callback('Unable to find location!')
     }
     else
     {
        callback(undefined, daily.data[0].summary 
            +" It is currently " 
            + currently.temperature 
            + " degrees out. There is a " 
        + currently.precipProbability 
        + "% chance of rain." 
        + "The maximum temperature for today is " 
        + daily.data[0].temperatureMax + 
        " degrees and the minimum temperature is " 
        +daily.data[0].temperatureMin + " degrees.")
     }
 })
} 

module.exports = forecast
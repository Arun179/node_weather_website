const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJ1bi1rdW1hciIsImEiOiJjang2cnYxMmkwMnRiM3RvMWVvMmUzN2lkIn0.UuCFiWavA4s2M6ZgUU801A&limit=1'
    request({url, json: true}, (err, res={}) => {
        
        if(err)
        {
            callback('Unable to connect to location services!')
        }
        else if (!res.body.features  || res.body.features[0] === undefined) {
            callback('Unable to find location!')
        }
        else {
            const {features} = res.body
            callback(undefined, {
            latitude: features[0].center[1],
            longitude: features[0].center[0],
            location: features[0].place_name
            })
        }
    })
}

module.exports = geocode
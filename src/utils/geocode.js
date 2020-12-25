const request= require('request');

//GEOCODING API: 
const geo_token= 'pk.eyJ1Ijoic29sbWFydGluZXpwIiwiYSI6ImNraWhwOW95NjBjcDEycXFsMWp5cXN0eG0ifQ.nf2HIkEgm9seaKn7D6BrPQ';

const geocode= (address, callback) => {
    const url_geo= `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geo_token}&limit=1`;
    
    request({url: url_geo, json: true}, (error, response)=> {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (response.body.features.length=== 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;
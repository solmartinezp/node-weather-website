const request= require('request');

//WEATHERSTACK API: to get the temperature
const weather_token= '1b9d1a0721909753db71d65ae9a572e7';

const forecast= (paramOne, paramTwo, callback) => {
    const url_weather= `http://api.weatherstack.com/current?access_key=${weather_token}&query=${paramOne},${paramTwo}`;

    request({url: url_weather, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
            console.log(url_weather);
        } else {
            callback(undefined, response.body.current.weather_descriptions[0]+ ': It is currently '+ response.body.current.temperature +' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.');
        }
    }); //function to make the request that takes 2 parameters:
    //First parameter: an object with the URL of where I want to get the data from in JSON format 
    //Second parameter: a function that indicates that I want to do with that data once I obtain it.    
}

module.exports= forecast;



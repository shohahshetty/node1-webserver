const request = require('request')

const forecast = (longitude,latitude, callback) =>{

    const url ='http://api.weatherstack.com/current?access_key=42678cb80f64c79340da463e5ec86f03&query='+longitude+','+latitude
    
    request({ url:url, json:true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service!', undefined)
        }else if(body.length === 0){
            callback('Unable to find the place. Search again!', undefined)
        }else {
            callback(undefined, 'It is currently '+body.current.temperature+' degree celsius. There is '+body.current.weather_descriptions+' expected.')
        }
    })
}

module.exports = forecast
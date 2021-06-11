const request = require("request")

const geocode = (address, callback) => {
    
    const geocodeURl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=2&access_token=pk.eyJ1Ijoic2hvaGFuMSIsImEiOiJja3BodHU0dnIwOGF0MnVvZjNlZjZhNHp2In0.FuX-ir5G6XsowszUdSFMEA&limit=1'
    request({url:geocodeURl, json:true}, (error, {body} ={})=>{
        if(error){
            callback('Unable to connect to location service!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find the place. Search again!', undefined)
        }else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].properties.address
            })
        }
    })

}

module.exports = geocode
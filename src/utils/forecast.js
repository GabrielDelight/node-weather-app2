const request = require("request")


const forecast = (latitude, longitude, callback) =>{
  const url = 'https://api.darksky.net/forecast/d8ccb20b047d6eb2029dace9db2dee08/' + encodeURIComponent(latitude) +','+   encodeURIComponent(longitude)+'?units=si';
  request({url, json: true}, (error, { body }) => {
    if(error){
      callback('Can connect to weather server', undefined);
    }else if(body.error){
      callback('Can not get ur search term please try another search', undefined);
    }else {
      callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out,  and ' + ' Weather temperature  high says ' + body.daily.data[0].temperatureHigh + ' and temperature  high says ' + body.daily.data[0].temperatureLow + '. '+ body.currently.precipProbability + '% chance of rain and'  )      
    }
  })

}

module.exports = forecast



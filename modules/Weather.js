const axios = require('axios'); 
const { query } = require('express');

class WeatherData{
    constructor(element){
        this.date = element.datetime;
        this.description = element.weather.description;
    }
}



let cacheMemory2 = {};


function getWeatherHandler(req, res){
    
    let cityname =  req.query.cityname;
  
    
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${cityname}&days=3`
        console.log(url);
        if(cacheMemory2[cityname] !== undefined){
            console.log('the cashe contain data ')
            console.log(cacheMemory2);
            res.send(cacheMemory2[cityname]);
        }
        else {
            console.log('cache memory is empty hit the api')
        }
        axios.get(url).then(item => {
            console.log(item);
            let newArr = item.data.data.map(element =>{
                return new WeatherData(element);
            })
            cacheMemory2[cityname] = newArr;
            res.send(newArr);
        }).catch(error =>{
            res.send(error)
        })

        
       
     
}
module.exports = getWeatherHandler;
'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();
const axios = require('axios');
// const weatherData = require('./data/weather.json');

const PORT = process.env.PORT;
server.use(cors());

class WeatherData{
    constructor(element){
        this.date = element.datetime;
        this.description = element.weather.description;
    }
}
server.get('/weather', getWeatherHandler);
server.get('/test', testHandler);
server.get('*', notFoundHandler);

 function getWeatherHandler(req, res){
    
    let cityname =  req.query.cityname;
   //https://api.weatherbit.io/v2.0/forecast/daily?key=&city=&days=3
   
    
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${cityname}&days=3`
        console.log(url);

        axios.get(url).then(item => {
            console.log(item);
            let newArr = item.data.data.map(element =>{
                return new WeatherData(element);
            })
            res.send(newArr);
        }).catch(error =>{
            res.send(error)
        })

        
       
     
}

function testHandler(req,res){
    res.send('test');
}
function notFoundHandler(req,res){
    res.status(404).send('route is not found')
}


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})
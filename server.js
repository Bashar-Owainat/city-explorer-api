'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();
const axios = require('axios');
const weatherData = require('./data/weather.json');

const PORT = process.env.PORT;
server.use(cors());

class weatherData{
    constructor(date, description){
        this.date = date;
        this.description = description;
    }
}
server.get('/weather', getWeatherHandler);
server.get('/test', testHandler);
server.get('*', notFoundHandler)

 function getWeatherHandler(req, res){
    
    let cityname =  req.query.cityname;
   //https://api.weatherbit.io/v2.0/current?key=&city=
   
    
    let url = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&city=${cityname}`
        console.log(url);

        axios.get(url).then(item => {
            let newArr = item.data.map(e =>{
                return new weatherData()
            })
        
        })

     
}

function testHandler(req,res){
    res.send(weatherData);
}
function notFoundHandler(req,res){
    res.status(404).send('route is not found')
}


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})
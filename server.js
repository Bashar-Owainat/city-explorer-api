'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const weatherData = require('./data/weather.json');

const PORT = 3001;
server.use(cors());

server.get('/getWeather', (req, res)=> {
    //weather.json[0].data[0].weather.description for seattle
    //weather.json[0].data[0].datetime

    //weather.json[1] has Paris
    //weather.json[2] has Amman
    let name =  req.query.cityname;
    
   
    let weatherInfo = weatherData[0].find((item)=> {
        if(item.city_name === name){
            
            return item;
        }
    })
   
   console.log(weatherInfo);
    res.send(weatherInfo[0])
})
server.get('/test',(req,res)=>{
    res.send(weatherData);
})
server.get('*',(req,res)=>{
    res.status(404).send('route is not found')
})


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})
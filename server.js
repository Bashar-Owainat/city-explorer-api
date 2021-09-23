'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const weatherData = require('./data/weather.json');

const PORT = process.env.PORT;
server.use(cors());


//http://localhost:3001/weather?cityname=

server.get('/weather', (req, res)=> {
    
    let cityname =  req.query.cityname;
   
   
    let weatherInfo = weatherData.find((item)=> {
        

        if(item.city_name === cityname){
            
            return item;
        }
    })
   
    let newArr = weatherInfo.data.map(e =>{
        return new Forecast(e.datetime, e.weather.description);
    })
 
    res.send(newArr)
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
'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();
const axios = require('axios');
// const weatherData = require('./data/weather.json');
const getWeatherHandler = require('./modules/Weather.js') 
const movieHandler = require('./modules/Movie.js')

const PORT = process.env.PORT;
server.use(cors());

 //https://api.weatherbit.io/v2.0/forecast/daily?key=&city=&days=3
server.get('/weather', getWeatherHandler);
server.get('/movie', movieHandler);
server.get('/test', testHandler);
server.get('*', notFoundHandler);

function testHandler(req,res){
    res.send('test');
}
function notFoundHandler(req,res){
    res.status(404).send('route is not found')
}


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})
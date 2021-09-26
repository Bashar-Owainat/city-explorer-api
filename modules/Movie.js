const axios = require('axios'); 
const { query } = require('express');


class Movie {
    constructor(movie) {
        this.title = movie.title;
        this.overview = movie.overview;
        this.averageVotes = movie.vote_average;
        this.totalVotes = movie.vote_count;
        this.imageUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
        this.popularity = movie.popularity;
        this.releasedOn = movie.release_date;
        
    }
}


let cacheMemory = {};

function movieHandler(request, response) {
    //destructuring in JS
    console.log(request.query);
    // let searchQuery2 = request.query.searchQuery;
    // let page2 = request.query.page;
    // let title2 = request.query.title;
    let { searchQuery } = request.query;

    //http://localhost:3001/movie?searchQuery=palace&page=1&api_key=dfdc5d9540ccc1c9a0a76eab961871c2
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&language=de-DE&region=DE`;
    if(cacheMemory[searchQuery] !== undefined){
        console.log('the cashe contain data ')
        console.log(cacheMemory);
        res.send(cacheMemory[searchQuery]);
    }
    else {
        console.log('cache memory is empty hit the api')
    }
    axios.get(url)
    .then(results => {
         console.log(results.data);
        const newArr = results.data.results.map(movie => new Movie(movie));
        cacheMemory[searchQuery] = newArr;
        response.status(200).send(newArr);
    })     
}




module.exports = movieHandler; 
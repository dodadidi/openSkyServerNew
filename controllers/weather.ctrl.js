
const axios = require('axios');
const consts = require('../constants');
const { API_KEY } = consts;
exports.weatherController = {
    
    getWeather(req,res){
        const city = req.query;
        const apiKey = API_KEY;
        const unit = "metric";
        const url="https://api.openweathermap.org/data/2.5/weather?q="+city.q+"&appid="+apiKey+"&units="+unit;
        axios.get(url).then(function(response){
          res.json(response.data);  
        });     
    }
}


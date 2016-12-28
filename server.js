var login = require('facebook-chat-api');
var getWeather = require('./getWeather');
var port = process.env.PORT || 8080;
var express = require('express');
var app = express();
var people = require('./people');
var config = require('./config');

var account = {
    email: config.FB_ACCOUNT,
    password: config.FB_PW
};




app.get('/', function(req, res) {
    login(account, function(err, api){

        var interval = 12 * 3600 * 1000; // 12 hour
        setInterval(function(){
            getWeather(function(err, weather){
                people.map(function(e){
                    api.sendMessage(weather, e.id);
                });
                
            });
        }, interval);
    
    });
    res.send('hello world');
    //
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
var login = require('facebook-chat-api');
var getWeather = require('./getWeather');
var port = process.env.PORT || 8080;
var express = require('express');
var app = express();
var people = require('./people');
var config = require('./config');
var locKey = require('./location');


var account = {
    email: config.FB_ACCOUNT,
    password: config.FB_PW
};




app.get('/', function(req, res) {
    login(account, function(err, api){
        //  getWeather(function(err, weather){
        //      const currentdate = new Date();
        //         people.map(function(e){
        //             let mes = '';
        //             mes = e.name + '早安~  ' +  currentdate.getFullYear() + "/"
        //         + (currentdate.getMonth()+1)  + "/" 
        //         + currentdate.getDate() + ' ' + weather;
        //             api.sendMessage(mes, e.id);
        //         });
                
        // });


        const currentdate = new Date();
        const time =  currentdate.getFullYear() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate();
        people.map((e)=>{
            getWeather(e.location, (err, weather)=>{
                 let mes = '';
                    mes = e.name + ' 晚安~  ' + time + ' ' 
                    + locKey[e.location] + '的天氣如下: ' + weather;
                    api.sendMessage(mes, e.id);
            });
        })
    
        // var interval = 12 * 3600 * 1000; // 12 hour
        // setInterval(function(){
        //     getWeather(function(err, weather){
        //         people.map(function(e){
        //             weather = e.name + '早安~  ' + weather;
        //             api.sendMessage(weather, e.id);
        //         });
                
        //     });
        // }, interval);
    
    });
    res.send('hello world');
    //
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
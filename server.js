var login = require('facebook-chat-api');
var getWeather = require('./getWeather');

var account = {
    email: 'FB_AC',
    password: 'FB_PW'
};

login(account, function(err, api){
    var id = 733447275;
    var interval = 3  * 1000; // 3 hour

    setInterval(function(){
        getWeather(function(err, weather){
            api.sendMessage(weather, id);
        });
    }, interval);
    
});
var login = require('facebook-chat-api');
var getWeather = require('./getWeather');

var account = {
    email: 'c1495616@gmail.com',
    password: 'jerry210492'
};

login(account, function(err, api){
    /*
    {
        my:733447275,
        flower:100000146521584
    }
    */ 
    var id = 733447275;
    var interval = 3   * 1000; // 3 hour

    setInterval(function(){
        getWeather(function(err, weather){
            api.sendMessage(weather, id);
        });
    }, interval);
    
});
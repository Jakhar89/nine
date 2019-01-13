
var express = require('express');
var path = require('path');
var index = require('./routes/index');
var bodyParser = require('body-parser');

var port = process.env.PORT||3000;
var app = express();

//View Engine
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Body Parser MW
app.use(bodyParser.json());
app.use (function (err, req, res, next){
    //Catch json error
    if (err instanceof SyntaxError) {
        let response={};
        response['error']='Could not decode request: JSON parsing failed';
        res.send(400,response);
      }
});
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);

app.listen(port, function(){
    console.log('Server started on port '+port);
});
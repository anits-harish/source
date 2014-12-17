
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var server=require('./public/javascripts/gmail').server;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

/*
if (app.get('/'))
	function(req,res){res.redirect('/');}*/
app.get('/', routes.index);
app.post('/hello',routes.hello);


app.post('/index', function(request, response){

    var name=request.body.user.name;
    var email=request.body.user.email;
console.log(name,email);
	

server.send({
text: "welcome to our new website", 
from: "you <harish.padi007@gmail.com>", 
to: email,
cc: "else <harish.padi007@gmail.com>",
subject: "hello "+" "+name+" "+" please check this",
});/*, function(err, message) { console.log(err || message); });
*/
response.render('index')

});
/*app.post('/userlogin', function(sReq, sRes){

    var email = sReq.query.email;
	console.log(email);

};
/*app.get('/hello',routes.hello);

*/
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

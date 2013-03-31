var express = require('express'),
  	lessMiddleware = require('less-middleware')

var pub = __dirname + '/public';

var app = express();
app.use(express.static(pub));
app.use(app.router);
app.use(express.errorHandler());

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

// ROUTER
app.get('/', function(req, res){
  	res.render('index.html');
});
app.get('*', function(req, res){
  	res.render('index.html');
});

app.listen(2000);
console.log('NodeCrimpd Express/Angular app started on port 2000');
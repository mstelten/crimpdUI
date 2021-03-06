var express = require('express'),
  	lessMiddleware = require('less-middleware');

var pub = __dirname + '/public';

var app = express();
app.use(lessMiddleware({
        src: __dirname + '/public',
        force: true
    }));
app.use(express.static(pub));
app.use(app.router);
app.use(express.errorHandler());

app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
  	res.render('index.html');
});
app.get('*', function(req, res) {
  	res.render('index.html');
});

app.listen(80);
console.log('NodeCrimpd Express/Angular app started on port 80');
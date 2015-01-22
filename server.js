var config = require('./config');

var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var Twitter = require('twitter');

// Serve up public/ftp folder
var serve = serveStatic('web', {'index': ['index.html', 'index.htm']})

// Create server
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
})

// Listen
console.log('Listening on localhost:'+config.port);
server.listen(config.port);

var twitterClient = new Twitter(config.twitter);
twitterClient.stream ('statuses/filter', { track: "#sitecore" }, function (stream) {
	stream.on('data', function(tweet) {
		console.log(tweet.text);
	});
});

twitterClient.get ('favorites/list', function (err, params, response) {
	if (err) {
		console.log(err);
		throw err;
	}
	console.log(params);
	console.log(response);
});
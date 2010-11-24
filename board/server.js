/**
 * Important note: this application is not suitable for benchmarks!
 */

var http = require('http')
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var sys = require('sys');
  
// the HTTP server
var server;
// the WebSocket server
var wsserver;
// the HTTP port
var port = 8080;

server = http.createServer(function(req, res){
  var path = url.parse(req.url).pathname;
  if (path == '/') {
     path = '/index.html'
  }
  console.log("serving " + path);
  fs.readFile(__dirname + path, function(err, data){
     if (err) {
        res.writeHead(404);
        res.end();        
     } else {
        res.writeHead(200, {'Content-Type': contentType(path)});
        res.write(data, 'utf8');
        res.end();
     }
  });
});

function contentType(path) {
   if (path.match('.js$')) {
      return "text/javascript";
   } else if (path.match('.css$')) {
      return  "text/css";           
   }  else {
      return "text/html";
   }
}

server.listen(port);
wsserver = io.listen(server);

console.log("HTTP server running at htpp://0.0.0.0:" + port );

var buffer = [];
 
wsserver.on('connection', function(client){
  client.send({ buffer: buffer });
  client.broadcast({ announcement: client.sessionId + ' connected' });
  
  client.on('message', function(message){
    var msg = { message: [client.sessionId, message] };
    buffer.push(msg);
    if (buffer.length > 15) buffer.shift();
    client.broadcast(msg);
  });

  client.on('disconnect', function(){
    client.broadcast({ announcement: client.sessionId + ' disconnected' });
  });
});

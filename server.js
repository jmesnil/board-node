var http = require('http');
var url = require('url');
var fs = require('fs');
var sys = require('sys');
  
// the HTTP server
var server;
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
   } else if (path.match('.manifest$')) {
      return  "text/cache-manifest";
   }  else {
      return "text/html";
   }
}

server.listen(port);
console.log("HTTP server running at htpp://0.0.0.0:" + port );
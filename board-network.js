(function(windows) {
   var socket = new WebSocket("ws://"+location.host);

   var pieces = {};

   var timeout = 2000; // in ms
   
   draw = function() {
      var now = new Date().getTime();
      Board.drawBoard();
      for (id in pieces) {
         if (pieces.hasOwnProperty(id)) {
            var piece = pieces[id];
            if (now - piece.timestamp > timeout) {
               delete pieces[id];
            } else {
               Board.drawPiece(piece);
            }
         }
      }
   }
   
   // first time, only the board will be drawn
   draw();
   
   // we draw at regular interval in case we
   // do not get any message from the server
   setInterval(function() {
      draw()
   }, timeout);
   
   socket.onerror = function() {
       alert("onerror " + arguments);
   };

   socket.onmessage = function(message) {
       var otherPiece = JSON.parse(message.data);
       var id = otherPiece.id;
       if (pieces[id]) {
          otherPiece.color = pieces[id].color;
       } else {
          otherPiece.color = randomColor();
       }
       pieces[id] = otherPiece;
       pieces[id].timestamp = new Date().getTime()
       draw();
   };

   Board.broadcast = function(piece) {      
      socket.send(JSON.stringify(piece));
   };
   
   randomColor = function() 
   { 
      var red = Math.floor(Math.random() * 255); 
      var green = Math.floor(Math.random() * 255); 
      var blue = Math.floor(Math.random() * 255); 
      return 'rgb('+red+','+green+','+blue+')'; 

   }
})(window);
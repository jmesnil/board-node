(function(windows) {
   var socket = new WebSocket("ws://"+location.host);

   socket.onerror = function() {
       alert("onerror " + arguments);
   };

   socket.onmessage = function(message) {
       var otherPiece = JSON.parse(message.data);
       Board.drawBoard();
       Board.drawPiece(otherPiece);
   };

   // override Board broadcast function to send
   // the piece data to the server
   Board.broadcast = function(piece) {
      socket.send(JSON.stringify(piece));
   };
})(window);
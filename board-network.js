(function(windows) {
  var socket = new WebSocket('ws://' + location.host);

  socket.onerror = function() {
    alert('onerror ' + arguments);
  };

  socket.onmessage = function(message) {
    var otherPiece = JSON.parse(message.data);
    Board.put(otherPiece.id, otherPiece);
  };

  Board.broadcast = function(piece) {
    // we broadcast only the center's x & y coordinates of the piece
    var out = { center: {x: piece.center.x, y: piece.center.y} };
    socket.send(JSON.stringify(out));
  };

})(window);

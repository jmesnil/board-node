$(document).ready(function() {
   window.addEventListener("devicemotion", function(event) {
      var accel = event.accelerationIncludingGravity;
      Board.updateCenter(accel);
      Board.drawBoard();
      Board.drawPiece(Board.piece);
      // Board.broadcast is only available
      // when the client can acess the server
      if (Board.broadcast) {
         Board.broadcast(Board.piece);
      }
   }, true);
});
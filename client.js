$(document).ready(function() {
   window.addEventListener("devicemotion", function(event) {
      var accel = event.accelerationIncludingGravity;
      Board.updateCenter(accel);
      Board.drawBoard();
      Board.drawPiece(Board.piece);
      Board.broadcast(Board.piece);
   }, true);
});
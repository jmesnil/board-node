$(document).ready(function() {
   var board = document.getElementById("board");
   var context = board.getContext("2d");

   window.addEventListener("devicemotion", function(event) {
      var accel = event.accelerationIncludingGravity;
      Board.updateCenter(accel);
      Board.drawBoard(context);
      Board.drawPiece(context, Board.piece);
      Board.broadcast(Board.piece);
   }, true);
});
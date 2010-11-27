(function(windows) {

   // 2D context of the board <canvas>
   var context = document.getElementById("board").getContext("2d");

   var kBoardWidth = 320;
   var kBoardHeight = 460;
   var kCircleRadius = 32;

   var Board = {};

   Board.piece = {
      center : {
         x: kBoardWidth / 2,
         y: kBoardHeight / 2,
         xShift : 0,
         yShift : 0
      },
      color: "#000"
   };

   Board.drawBoard = function() {
      context.clearRect(0, 0, kBoardWidth,  kBoardHeight);
      for (var x = 0.5; x < kBoardWidth; x += 10) {
         context.moveTo(x, 0);
         context.lineTo(x, kBoardHeight);
      }
      for (var y = 0.5; y < kBoardHeight; y += 10) {
         context.moveTo(0, y);
         context.lineTo(kBoardWidth, y);
      }
      context.strokeStyle = "#eee";
      context.stroke();
   };

   Board.drawPiece = function(piece) {
      context.fillStyle = piece.color;
      context.beginPath();
      context.arc(piece.center.x, piece.center.y, kCircleRadius, 0, Math.PI * 2, false);
      context.closePath();
      context.fill();
   };

   Board.updateCenter = function(acceleration) {
      c = Board.piece.center;
      c.xShift = c.xShift * 0.8 + acceleration.x * 2.0;
      c.yShift = c.yShift * 0.8 + acceleration.y * 2.0;
      c.x = c.x + c.xShift;
      // use *minus* to compute the center's new y
      c.y = c.y - c.yShift;
      // do not go outside the boundaries of the canvas
      if (c.x < kCircleRadius) {
         c.x = kCircleRadius;
      }
      if (c.x > kBoardWidth - kCircleRadius) {
         c.x = kBoardWidth - kCircleRadius;
      }
      if (c.y < kCircleRadius) {
         c.y = kCircleRadius;
      }
      if (c.y > kBoardHeight - kCircleRadius) {
         c.y = kBoardHeight - kCircleRadius;
      }
      Board.piece.center = c;
   };

   Board.broadcast = function(piece) {
      // do nothing
   };

   window.Board = Board;
})(window);

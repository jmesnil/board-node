var kBoardWidth = 320;
var kBoardHeight = 460;
var kCircleRadius = 32;

var piece = {
   center : {
      x: kBoardWidth / 2,
      y: kBoardHeight / 2,
      xShift : 0,
      yShift : 0
   },
   color: "#000"
};

$(document).ready(function() {
   var board = document.getElementById("board");
   var context = board.getContext("2d");
   window.addEventListener("devicemotion", function(event) {
      var accel = event.accelerationIncludingGravity;
      piece.center = computeCenter(piece.center, accel);
      drawBoard(context);
      drawPiece(context, piece);
   }, true);
});

function drawBoard(context) {
   context.clearRect(0, 0, kBoardWidth, kBoardHeight);
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
}

function drawPiece(context, piece) {
   context.fillStyle = piece.color;
   context.beginPath();
   context.arc(piece.center.x, piece.center.y, kCircleRadius, 0, Math.PI * 2, false);
   context.closePath();
   context.fill();
}

function computeCenter (oldCenter, acceleration) {
   newCenter = {};
   newCenter.xShift = oldCenter.xShift * 0.8 + acceleration.x * 2.0;
   newCenter.yShift = oldCenter.yShift * 0.8 + acceleration.y * 2.0;
   newCenter.x = oldCenter.x + oldCenter.xShift;
   // use *minus* to compute the center's new y
   newCenter.y = oldCenter.y - oldCenter.yShift;
   // do not go outside the boundaries of the canvas
   if (newCenter.x < kCircleRadius) {
      newCenter.x = kCircleRadius;
   }
   if (newCenter.x > kBoardWidth - kCircleRadius) {
      newCenter.x = kBoardWidth - kCircleRadius;
   }
   if (newCenter.y < kCircleRadius) {
      newCenter.y = kCircleRadius;
   }
   if (newCenter.y > kBoardHeight - kCircleRadius) {
      newCenter.y = kBoardHeight - kCircleRadius;
   }
   return newCenter;
}


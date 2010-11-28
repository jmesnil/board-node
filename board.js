(function(windows) {

  var canvas = document.getElementById('board');

  var Board = {
    WIDTH: 320,
    HEIGHT: 460,
    CIRCLE_RADIUS: 32,
    TIMEOUT: 1000, // in ms
    REFRESH: 100 // in ms
  };

  // the own piece of the client
  Board.myPiece = {
    center: {
      x: Board.WIDTH / 2,
      y: Board.HEIGHT / 2,
      xShift: 0,
      yShift: 0
    },
    color: '#000',
    // myPiece may never be updated if the browser
    // does not support the DeviceOrientation Event API
    updated: false
  };

  // the pieces of the other clients which are received from the server
  var pieces = {};

  var randomColor = function() {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
  }

  Board.put = function(id, piece) {
    if (pieces[id]) {
      piece.color = pieces[id].color;
    } else {
      piece.color = randomColor();
    }
    pieces[id] = piece;
    pieces[id].timestamp = new Date().getTime();
  };

  var draw = function() {
    canvas.getContext('2d').clearRect(0, 0, Board.WIDTH, Board.HEIGHT);

    var buffer = document.createElement('canvas');
    buffer.width = Board.WIDTH;
    buffer.height = Board.HEIGHT;
    drawBuffer(buffer.getContext('2d'));
    canvas.getContext('2d').drawImage(buffer, 0, 0);
  };

  var drawBuffer = function(context) {
    drawBoard(context);

    var now = new Date().getTime();
    for (id in pieces) {
      if (pieces.hasOwnProperty(id)) {
        var piece = pieces[id];
        if (now - piece.timestamp > Board.TIMEOUT) {
          delete pieces[id];
        } else {
          drawPiece(context, piece);
        }
      }
    }

    if (Board.myPiece.updated) {
      drawPiece(context, Board.myPiece);
    }

  };

  var drawBoard = function(context) {
    context.save();
    context.beginPath();
    for (var x = 0.5; x < Board.WIDTH; x += 10) {
      context.moveTo(x, 0);
      context.lineTo(x, Board.HEIGHT);
    }
    for (var y = 0.5; y < Board.HEIGHT; y += 10) {
      context.moveTo(0, y);
      context.lineTo(Board.WIDTH, y);
    }
    context.closePath();

    context.strokeStyle = '#eee';
    context.stroke();
    context.restore();
  };

  var drawPiece = function(context, piece) {
    context.save();
    context.fillStyle = piece.color;
    context.beginPath();
    context.arc(piece.center.x, piece.center.y,
                Board.CIRCLE_RADIUS, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    context.restore();
  };

  Board.updateCenter = function(acceleration) {
    c = Board.myPiece.center;
    c.xShift = c.xShift * 0.8 + acceleration.x * 2.0;
    c.yShift = c.yShift * 0.8 + acceleration.y * 2.0;
    c.x = Math.floor(c.x + c.xShift);
    // use *minus* to compute the center's new y
    c.y = Math.floor(c.y - c.yShift);
    // do not go outside the boundaries of the canvas
    if (c.x < Board.CIRCLE_RADIUS) {
      c.x = Board.CIRCLE_RADIUS;
    }
    if (c.x > Board.WIDTH - Board.CIRCLE_RADIUS) {
      c.x = Board.WIDTH - Board.CIRCLE_RADIUS;
    }
    if (c.y < Board.CIRCLE_RADIUS) {
      c.y = Board.CIRCLE_RADIUS;
    }
    if (c.y > Board.HEIGHT - Board.CIRCLE_RADIUS) {
      c.y = Board.HEIGHT - Board.CIRCLE_RADIUS;
    }
    Board.myPiece.center = c;
    Board.myPiece.updated = true;
  };

  // the canvas is drawn at regular interval
  setInterval(function() {
    draw();
  }, Board.REFRESH);

  // first time, only the board will be drawn
  draw();

  window.Board = Board;
})(window);

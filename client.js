$(document).ready(function() {
  if (!window.DeviceMotionEvent) {
    var msg = 'Your Web Browser does not support the DeviceOrientation Event API.<br>';
    msg += 'You will be able to see the pieces of other users moving but do not try to tilt your screen :)';
    $('#warning').html(msg);
  }

  window.addEventListener('devicemotion', function(event) {
    var accel = event.accelerationIncludingGravity;
    Board.updateCenter(accel);
    // Board.broadcast is only available
    // when the client can acess the server
    if (Board.broadcast) {
      Board.broadcast(Board.myPiece);
    }
  }, true);
});

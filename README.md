# Prerequisites

1. install node.js

# Run the game

## Run the server

On your server machine:

  $ node server.js
  ...
  HTTP server running at htpp://0.0.0.0:8080
  
## Run the client

On you iPhone/iPad, open http://&lt;server-name>:8080/ and move the device to move the piece on the board
(To know the name of your server, use `hostname` in a terminal)


# What's next:

* TODO alert the user if the device orientation API is not available on his browser
* TODO make the application work offline
* TODO open a websocket to the server on page load
* TODO send the circle coords + color to the server through the websocket
* TODO receives messages from the server and display the circles on the canvas

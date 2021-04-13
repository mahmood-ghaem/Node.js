/**
 * Exercise 3: Create an HTTP web server
 */

var http = require('http');

//create a server
let server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE
  const fs = require('fs');
  let returnValue = '';

  switch (req.url) {
    case '/':
      fs.readFile('./index.html', 'utf8', (error, data) => {
        if (error) {
          errorHandling(error);
        } else {
          res.writeHeader(200, { 'Content-Type': 'text/html' });
          returnValue = data;
        }
      });
      break;
    case '/index.js':
      fs.readFile('./index.js', 'utf8', (error, data) => {
        if (error) {
          errorHandling(error);
        } else {
          res.writeHeader(200, { 'Content-Type': 'text/js' });
          returnValue = data;
        }
      });
      break;
    case '/style.css':
      fs.readFile('./style.css', 'utf8', (error, data) => {
        if (error) {
          errorHandling(error);
        } else {
          res.writeHeader(200, { 'Content-Type': 'text/css' });
          returnValue = data;
        }
      });
      break;
  }

  res.write(returnValue); // Sends a response back to the client
  res.end(); // Ends the response
});

const errorHandling = (error) => {
  console.log(error);
  throw new Error(error);
};

server.listen(3000); // The server starts to listen on port 3000

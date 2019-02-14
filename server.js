const http = require('http');
const port = 8362;
const server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-type', 'text/plain');
  res.end('HHHH');
});
server.listen(port, '127.0.0.1', function() {
  console.log('server start');
});

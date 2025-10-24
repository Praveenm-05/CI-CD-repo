const http = require('http');
const PORT = process.env.PORT || 80;
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello from updated CI/CD demo!\n');
});
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


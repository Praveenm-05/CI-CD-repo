const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 80;

const server = http.createServer((req, res) => {
  if(req.url === "/") {
    res.writeHead(200, {'Content-Type':'text/html'});
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading page");
      } else {
        res.end(data);
      }
    });
  } else if(req.url === "/style.css") {
    res.writeHead(200, {'Content-Type':'text/css'});
    fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading CSS");
      } else {
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end("Page Not Found");
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    const filePath = path.join(__dirname, "public", "index.html");
    const html = fs.readFileSync(filePath, "utf-8");

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }

  else if (req.url === "/api") {
    const filePath = path.join(__dirname, "public", "db.json");
    const data = fs.readFileSync(filePath, "utf-8");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }

});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
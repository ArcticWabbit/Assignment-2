// https://resilient-sundae-9b1292.netlify.app

const http = require("http");
const path = require("path");
const fs = require("fs");
const { MongoClient } = require("mongodb");

const PORT = 3000;

const uri = "mongodb+srv://mmahin_db_user:test123@cluster0.gftacxt.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let db;

async function connectDB() {
  await client.connect();
  db = client.db("test");
}

connectDB();

const server = http.createServer(async (req, res) => {

  if (req.url === "/") {
    const filePath = path.join(__dirname, "public", "index.html");
    const html = fs.readFileSync(filePath, "utf-8");

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }

  else if (req.url === "/api") {
    try {
      const users = await db.collection("users").find().toArray();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Database error");
    }
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }

});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
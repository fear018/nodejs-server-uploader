require("dotenv").config();
const { createServer } = require("http");
const router = require("./services/router");

const port = 5000;
const host = "127.0.0.1";

const server = createServer((req, res) => {
  router.lookup(req, res);
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", true);
  // res.setHeader("Content-Type", "text/plain");
});

server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
  }
});

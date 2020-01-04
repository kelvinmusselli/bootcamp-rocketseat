const express = require("express");

const server = express();

server.get("/teste", (req, res) => {
  return res.json({ name: [{ ola: "ola" }, { ola: "tudo bem" }] });
});

server.listen(3000);

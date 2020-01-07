const express = require("express");

const server = express();
server.use(express.json()); //se não colocar este parametro vc nao consegue mandar body json

server.get("/query", (req, res) => {
  const nome = req.query.nome;
  return res.json({ message: `Hello ${nome}` });
});

server.get("/routes/:id", (req, res) => {
  const id = req.params.id;
  return res.json({ message: `Hello User Você Me Encontrou => Id: ${id}` });
});

// VARIAVEL DOS USERS
const users = ["Kelvin", "Marcos", "Joana"];
// GET
server.get("/users", (req, res) => {
  return res.json(users);
});
//GET BY INDEX 'ID'
server.get(`/user/:index`, (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});
// POST
server.post("/user", (req, res) => {
  // desestruturado;
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.listen(3000);

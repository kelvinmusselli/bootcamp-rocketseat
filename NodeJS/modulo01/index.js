const express = require("express");

const server = express();

//se não colocar este parametro vc nao consegue mandar body json
server.use(express.json());

// MIDDLEWARE GLOBAL EXEMPLO
server.use((req, res, next) => {
  console.log(`Metodo => ${req.method}, URL => ${req.url}`);
  return next();
});
// get by query
server.get("/query", (req, res) => {
  const nome = req.query.nome;
  return res.json({ message: `Hello ${nome}` });
});

//get params
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

// PUT
server.put(`/user/:index`, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;

  return res.json(users);
});

//DELETE
server.delete(`/user/:index`, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json(users);
});

//para apontar qual porta irá rodar
server.listen(3000);

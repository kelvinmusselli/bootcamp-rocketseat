const express = require("express"); // chama o express para start o server nodes

const server = express(); //para dar start ao server cria uma var server e chama as funcoes do express

// simples
// server.get("/teste", (req, res) => {
//   // return res.send("Hello World");
//   return res.json({ message: "Hello World" });
// });

//com query params
server.get("/teste", (req, res) => {
  //
  // exemplo : http://localhost:3000/teste?nome=Kelvin
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}` });
});

//para consumo de route params
server.get("/users/:id", (req, res) => {
  //
  // exemplo : http://localhost:3000/users/1
  // const id = req.params.id;
  //com desestruturação
  const { id } = req.params;

  return res.json({ message: `Encontrando o : ${id}` });
});

//definindo porta do servidor
server.listen(3000);

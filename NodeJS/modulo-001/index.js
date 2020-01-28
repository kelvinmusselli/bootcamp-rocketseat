const express = require("express"); // chama o express para start o server nodes

const server = express(); //para dar start ao server cria uma var server e chama as funcoes do express

server.get("/teste", (req, res) => {
  // return res.send("Hello World");
  return res.json({ message: "Hello World" });
});
//definindo porta do servidor
server.listen(3003);

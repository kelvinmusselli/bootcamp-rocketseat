const express = require("express");
const routes = require("./routes");

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // metodo middleware
  middlewares() {
    // aqui dentro vou cadastrar todas middlewares da aplicação
    this.server.use(express.json()); // preparado para receber json
  }

  // metodo das rotas
  routes() {
    // chamando todas rotas para serem renderizadas
    this.server.use(routes);
  }
}
module.exports = new App().server;

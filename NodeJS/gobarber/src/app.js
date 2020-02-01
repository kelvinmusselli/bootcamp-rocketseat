import express from 'express';
import routes from './routes';

import './database';

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
export default new App().server;

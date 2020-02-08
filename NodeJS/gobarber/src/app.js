import express from 'express';
import routes from './routes';
import path from 'path';

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

    //esse this serve para criar um local acessivel do arquivo que é feito o upload de image de perfil
    //ele chama a lib path do nodejs
    // e na model server cria uma var virutal que nao armazena no banco o caminho
    //por boas praticas
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // metodo das rotas
  routes() {
    // chamando todas rotas para serem renderizadas
    this.server.use(routes);
  }
}
export default new App().server;

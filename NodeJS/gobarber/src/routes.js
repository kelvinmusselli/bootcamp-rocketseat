import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Kelvin',
    email: 'kelvinmusselli22@gmail.com',
    password_hash: '123456',
  });

  return res.json({ message: 'Cadastrado', data: user });
});

export default routes;

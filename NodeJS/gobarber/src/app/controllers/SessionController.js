import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    //passa email e senha para criar uma sessão
    const { email, password } = req.body;

    // esta variavel busca se existe o usuario no banco mesmo não autenticado por pode
    const user = await User.findOne({ where: { email } });

    //verifica se usuario NÃO existe na base
    if (!user) {
      res.status(401).json({ error: 'Não autorizado!' });
    }

    //verifica se a senha do usuario da base NÃO está certa para NÃO criar uma sessão
    if (!(await user.checkPassword(password))) {
      res
        .status(401)
        .json({ error: 'Senha incorreta, acesso não autorizado!' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();

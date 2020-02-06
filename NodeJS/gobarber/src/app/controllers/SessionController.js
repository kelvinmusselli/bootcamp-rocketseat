import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    //validando campos
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    //se alguma coisa não estive certa ele cai neste if
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados enviados, são invalidos...' });
    }

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

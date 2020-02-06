import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    //validando campos
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    //se alguma coisa não estive certa ele cai neste if
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados enviados, são invalidos...' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existente!' });
    }
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    //validando campos
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    //se alguma coisa não estive certa ele cai neste if
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados enviados, são invalidos...' });
    }

    //pego os parametros de requisição
    const { email, oldPassword } = req.body;

    //vou agora procura na base de dados o usuario que quer ser editado
    const user = await User.findByPk(req.userId);

    // se ele estiver alterando o email ele entrara no if
    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email: email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'Email já existente!' });
      }
    }

    // agora caso ele esteja mudando a senha
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha antiga não está correta' });
    }

    //caso tudo deu certo
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      success: `Atualizado as informações de ${name}`,
      data: {
        id,
        name,
        email,
        provider,
      },
    });
  }
}

export default new UserController();

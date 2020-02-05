import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
    //hook antes de mandar para o banco ele incripta a senha
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // se ele receber um password vc incripta
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  //metodo para autenticar usuário
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;

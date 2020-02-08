import Appointment from '../models/Appointment';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
  async index(req, res) {
    //parametro de paginação caso não traga nada sempre vira a primeira pagina
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 10,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json({
      success: 'Todos agendamentos',
      data: appointments,
    });
  }

  //MARCANDO UM HORARIO
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados incorretos!' });
    }

    const { provider_id, date } = req.body;

    //Verificando se o provider é mesmo um provedor de serviços
    const checkIsProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });

    //CASO NAO SEJA PROVEDOR DE SERVIÇOS
    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Este usuário não é um provedor de serviços' });
    }

    //ESTA VAR ARRENDONDA O HORARIO CASO ESTEJA ERRADO -> 18:30 FICARÁ 19H
    const hourStart = startOfHour(parseISO(date));

    //este if verifica se o usuário não quer agenda um horario ou data retroativa
    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Desculpe não é possível agendar este horário ' });
    }

    //VERIFICANDO SE NÃO HÁ DISPONIBILIDADE DE HORARIO NO BANCO DE DADOS
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res.status(400).json({
        error: 'Agenda ocupada, não é possível agendar este horário',
      });
    }

    //ocorreu tudo certo vamos salvar agora
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    return res.json({
      success: 'Agendamento, efetuado com sucesso...',
      data: appointment,
    });
  }
}
export default new AppointmentController();

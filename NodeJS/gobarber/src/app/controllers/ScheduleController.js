import Appointment from '../models/Appointment';
import { startOfDay, parseISO, endOfDay } from 'date-fns';
import User from '../models/User';
import { Op } from 'sequelize';

class ScheduleController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Este usuário não é um provedor de serviços' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json({ success: 'Agendamentos do dia', data: appointments });
  }
}
export default new ScheduleController();

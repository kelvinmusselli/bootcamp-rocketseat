import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Este usuário não pode visualizar as notificações' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json({ success: 'Lista de notificações', data: notifications });
  }

  async update(req, res) {
    // const notification = await Notification.findById(req.params.id);

    const notification = await Notification.findByIdAndUpdate(req.params.id, {
      read: true,
      new: true,
    });
    return res
      .status(200)
      .json({ success: 'Notificação lida', data: notification });
  }
}
export default new NotificationController();

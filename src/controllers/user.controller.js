import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { _id, password, oldPassword, google, email, ...rest } = req.body;

    if (password) {
        if (!oldPassword) {
            return res.status(400).json({
                msg: 'Proporciona tu contraseña anterior para actualizarla'
            });
        }

        const user = await User.findById(id);
        const validPassword = bcryptjs.compareSync(oldPassword, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña anterior es incorrecta'
            });
        }

        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true });

    res.json({
        msg: 'Usuario Actualizado',
        user
    });
}
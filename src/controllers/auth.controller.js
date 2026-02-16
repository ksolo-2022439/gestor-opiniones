import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

export const register = async (req, res) => {
    const { name, surname, username, email, password, phone } = req.body;
    const user = new User({ name, surname, username, email, password, phone });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    });
}

export const login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario eliminado'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacta a un administrador'
        });
    }
}
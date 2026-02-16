import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token in request'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token not valid - El usuario no existe en la DB'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Token not valid - Status del usuario: false'
            });
        }

        req.usuario = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token not valid'
        });
    }
}
import User from '../models/user.model.js';
import Post from '../models/post.model.js';

export const emailExists = async (email = '') => {
    const existe = await User.findOne({ email });
    if (existe) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
}

export const usernameExists = async (username = '') => {
    const existe = await User.findOne({ username });
    if (existe) {
        throw new Error(`El nombre de usuario ${username} ya está registrado`);
    }
}

export const userExists = async (id) => {
    const existe = await User.findById(id);
    if (!existe) {
        throw new Error(`El ID ${id} no existe`);
    }
}

export const postExists = async (id) => {
    const existe = await Post.findById(id);
    if (!existe) {
        throw new Error(`La publicación con el ID ${id} no existe`);
    }
}
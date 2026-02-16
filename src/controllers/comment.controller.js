import Comment from '../models/comment.model.js';
import Post from '../models/post.model.js';

export const createComment = async (req, res) => {
    const { content, post } = req.body;
    const author = req.usuario._id;

    const existingPost = await Post.findById(post);
    if (!existingPost) {
        return res.status(404).json({
            msg: 'Post not found'
        });
    }

    const comment = new Comment({ content, post, author });
    await comment.save();

    res.status(200).json({
        msg: 'Comentario añadido',
        comment
    });
}

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);

    if (!comment) {
        return res.status(404).json({
            msg: 'Comentario no encontrado'
        });
    }

    if (comment.author.toString() !== req.usuario._id.toString()) {
        return res.status(401).json({
            msg: 'No estás autorizado para editar este comentario'
        });
    }

    const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });

    res.status(200).json({
        msg: 'Comentario actualizado',
        comment: updatedComment
    });
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
        return res.status(404).json({
            msg: 'Comentario no encontrado'
        });
    }

    if (comment.author.toString() !== req.usuario._id.toString()) {
        return res.status(401).json({
            msg: 'No estás autorizado para eliminar este comentario'
        });
    }

    await Comment.findByIdAndUpdate(id, { status: false });

    res.status(200).json({
        msg: 'Comentario eliminado'
    });
}
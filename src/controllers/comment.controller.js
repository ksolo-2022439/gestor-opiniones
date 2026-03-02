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

export const getComments = async (req, res) => {
    const { limit = 10, from = 0 } = req.query;
    const query = { status: true };

    try {
        const [total, comments] = await Promise.all([
            Comment.countDocuments(query),
            Comment.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .populate('author', 'username')
                .populate('post', 'title')
        ]);

        res.status(200).json({
            total,
            comments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener los comentarios'
        });
    }
}

export const getCommentsByPost = async (req, res) => {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId, status: true })
        .populate('author', 'username _id');

    res.status(200).json({
        comments
    });
}
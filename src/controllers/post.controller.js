import Post from '../models/post.model.js';

export const createPost = async (req, res) => {
    const { title, category, content } = req.body;
    const author = req.usuario._id;

    const post = new Post({ title, category, content, author });

    await post.save();

    res.status(200).json({
        msg: 'Publicación exitosa',
        post
    });
}

export const getPosts = async (req, res) => {
    const { limit = 10, from = 0 } = req.query;
    const query = { status: true };

    const [total, posts] = await Promise.all([
        Post.countDocuments(query),
        Post.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('author', 'username')
    ]);

    res.status(200).json({
        total,
        posts
    });
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { _id, author, ...data } = req.body;

    const post = await Post.findById(id);

    if (post.author.toString() !== req.usuario._id.toString()) {
        return res.status(401).json({
            msg: 'No estás autorizado para modificar esta publicación'
        });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
        msg: 'Publicación actualizada',
        post: updatedPost
    });
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (post.author.toString() !== req.usuario._id.toString()) {
        return res.status(401).json({
            msg: 'No estas autorizado para eliminar esta publicación'
        });
    }

    await Post.findByIdAndUpdate(id, { status: false });

    res.status(200).json({
        msg: 'Publicación eliminada'
    });
}
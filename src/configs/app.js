import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from '../routes/auth.routes.js';
import userRoutes from '../routes/user.routes.js';
import postRoutes from '../routes/post.routes.js';
import commentRoutes from '../routes/comment.routes.js';

const configs = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
}

export const initServer = () => {
    const app = express();
    configs(app);

    app.use('/gestorOpiniones/v1/auth', authRoutes);
    app.use('/gestorOpiniones/v1/users', userRoutes);
    app.use('/gestorOpiniones/v1/posts', postRoutes);
    app.use('/gestorOpiniones/v1/comments', commentRoutes);

    return app;
}
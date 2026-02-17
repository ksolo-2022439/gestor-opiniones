import { Router } from 'express';
import { check } from 'express-validator';
import { createComment, updateComment, deleteComment } from '../controllers/comment.controller.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { getCommentsByPost } from '../controllers/comment.controller.js';

const router = Router();

router.post('/', [
    validateJWT,
    check('content', 'Content is required').not().isEmpty(),
    check('post', 'Post ID is required').isMongoId(),
    validateFields
], createComment);

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('content', 'Content is required').not().isEmpty(),
    validateFields
], updateComment);

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    validateFields
], deleteComment);

router.get('/:postId', getCommentsByPost);

export default router;
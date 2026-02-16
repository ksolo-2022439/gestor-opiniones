import { Router } from 'express';
import { check } from 'express-validator';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/post.controller.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { postExists } from '../helpers/db-validators.js';

const router = Router();

router.get('/', getPosts);

router.post('/', [
    validateJWT,
    check('title', 'Title is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    validateFields
], createPost);

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(postExists),
    validateFields
], updatePost);

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(postExists),
    validateFields
], deletePost);

export default router;
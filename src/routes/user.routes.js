import { Router } from 'express';
import { check } from 'express-validator';
import { updateUser } from '../controllers/user.controller.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { userExists } from '../helpers/db-validators.js';

const router = Router();

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userExists),
    validateFields
], updateUser);

export default router;
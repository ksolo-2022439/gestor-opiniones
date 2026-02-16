import { Router } from 'express';
import { check } from 'express-validator';
import { login, register } from '../controllers/auth.controller.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { emailExists, usernameExists } from '../helpers/db-validators.js';

const router = Router();

router.post('/login', [
    check('identifier', 'Email or Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('surname', 'Surname is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be 6+ chars').isLength({ min: 6 }),
    check('email').custom(emailExists),
    check('username').custom(usernameExists),
    validateFields
], register);

export default router;
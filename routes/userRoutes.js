import express from 'express';
import { register, login } from '../controllers/userController.js';
import { updateMoney } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/money', updateMoney);

export default router;
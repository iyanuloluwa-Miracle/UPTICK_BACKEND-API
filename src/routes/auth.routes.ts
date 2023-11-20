import express from 'express';
import AuthController from '../controllers/authController';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout); // Add this line for logout


export default router;

// routes/authRoutes.ts
import express from 'express';
import AuthController from '../controllers/adminAuthController';
import adminAuth from '../middlewares/adminAuth';

const router = express.Router();

// Use checkBody middleware for the signup route
router.post('/signup', adminAuth, AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

export default router;

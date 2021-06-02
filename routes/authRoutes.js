import express from 'express';
import {
  loginController,
  logoutController,
  refreshTokenController,
  signupController,
} from '../controller/authController.js';

const authRoutes = express.Router();

authRoutes.route('/signup').post(signupController);
authRoutes.route('/login').post(loginController);
authRoutes.route('/logout').post(logoutController);
authRoutes.route('/refresh-token').post(refreshTokenController);

export default authRoutes;

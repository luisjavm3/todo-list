import express from 'express';

import { updateUserController } from '../controller/userController.js';
import { ADMIN, SUPER } from '../config/roles.js';
import authUser from '../middlewares/authUser.js';
import authRole from '../middlewares/authRole.js';

let userRoutes = express.Router();

userRoutes
  .route('/:userId')
  .put(authUser, authRole([ADMIN, SUPER]), updateUserController);

export default userRoutes;

import express from 'express';
import { getAllTodosController } from '../controller/todoController.js';
import authUser from '../middlewares/authUser.js';

const todoRoutes = express.Router();

todoRoutes.route('/').get(authUser, getAllTodosController);

export default todoRoutes;

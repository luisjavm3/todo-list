import express from 'express';
import {
  createTodoController,
  getAllTodosController,
} from '../controller/todoController.js';
import authUser from '../middlewares/authUser.js';

const todoRoutes = express.Router();

todoRoutes.route('/').get(authUser, getAllTodosController);
todoRoutes.route('/').post(authUser, createTodoController);

export default todoRoutes;

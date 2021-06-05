import express from 'express';
import {
  createTodoController,
  getAllTodosController,
  updateTodoController,
} from '../controller/todoController.js';
import authUser from '../middlewares/authUser.js';

const todoRoutes = express.Router();

todoRoutes.route('/').get(authUser, getAllTodosController);
todoRoutes.route('/').post(authUser, createTodoController);
todoRoutes.route('/').put(authUser, updateTodoController);

export default todoRoutes;

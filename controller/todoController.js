// import ErrorResponse from '../utils/ErrorResponse';
import { createTodo } from '../services/todoService.js';

export const getAllTodosController = (req, res, next) => {
  const user = req.user;
  res.status(200).json({ user });
};

export const createTodoController = async (req, res, next) => {
  const todo = req.body;

  try {
    const newTodo = await createTodo(todo);

    res.status(200).json({ success: true, todo: newTodo });
  } catch (error) {
    next(error);
  }
};

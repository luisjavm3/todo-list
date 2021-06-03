// import ErrorResponse from '../utils/ErrorResponse';
import { createTodo, findAllTodos } from '../services/todoService.js';

export const getAllTodosController = async (req, res, next) => {
  const user = req.user;

  try {
    const todos = await findAllTodos(user._id, user.role);
    res.status(200).json({ success: true, content: todos });
  } catch (error) {
    next(error);
  }

  // res.status(200).json({ user });
};

export const createTodoController = async (req, res, next) => {
  const todo = req.body;
  const user = req.user;

  try {
    todo.userId = user._id;
    const newTodo = await createTodo(todo);

    res.status(200).json({ success: true, todo: newTodo });
  } catch (error) {
    next(error);
  }
};

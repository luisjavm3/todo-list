// import ErrorResponse from '../utils/ErrorResponse.js';
import {
  createTodo,
  deleteTodo,
  findAllTodos,
  updateTodo,
} from '../services/todoService.js';

export const getAllTodosController = async (req, res, next) => {
  const user = req.user;
  let todos;

  try {
    todos = await findAllTodos(user._id, user.role);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ success: true, content: todos });
};

export const createTodoController = async (req, res, next) => {
  const todo = req.body;
  const user = req.user;
  let newTodo;
  todo.userId = user._id;

  try {
    newTodo = await createTodo(todo);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ success: true, todo: newTodo });
};

export const updateTodoController = async (req, res, next) => {
  const user = req.user;
  const todo = req.body;
  let updatedTodo;

  try {
    updatedTodo = await updateTodo(todo, user);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ success: true, todo: updatedTodo });
};

export const deleteTodoController = async (req, res, next) => {
  const user = req.user;
  const todo = req.body;
  let deletedTodo;

  try {
    deletedTodo = await deleteTodo(todo, user);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ success: true, todo: deletedTodo });
};

export const findTodoController = async (req, res, next) => {};

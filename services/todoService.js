import Todo from '../model/Todo.js';

export const findAllTodos = async (userId, userRole) => {};

export const createTodo = async (todo) => {
  try {
    return await Todo.create(todo);
  } catch (error) {
    throw error;
  }
};

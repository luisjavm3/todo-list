import Todo from '../model/Todo.js';
import mongoose from 'mongoose';

import { ADMIN, SUPER, USER } from '../config/roles.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const findAllTodos = async (userId, userRole) => {
  let todos;

  const findAllAsAUser = [{ $match: { userId, done: false } }];
  const findAllAsAAdmin = [
    {
      $match: {
        done: false,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $match: {
        $or: [
          {
            'user._id': userId,
          },
          {
            'user.role': 'user',
          },
        ],
      },
    },
  ];
  const findAllAsASuper = [
    {
      $match: {
        done: false,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
  ];

  switch (userRole) {
    case USER:
      todos = await Todo.aggregate(findAllAsAUser);
      break;

    case ADMIN:
      todos = await Todo.aggregate(findAllAsAAdmin);
      break;

    case SUPER:
      todos = await Todo.aggregate(findAllAsASuper);
      break;

    default:
      const error = new ErrorResponse("User's role unknown.", 400);
      throw error;
  }

  return todos;
};

export const createTodo = async (todo) => {
  return await Todo.create(todo);
};

export const updateTodo = async (todo, user) => {
  const { Types } = mongoose;
  const doneIsSettled = ['true', 'false'].includes(String(todo.done));

  if (!todo.name || !doneIsSettled || !todo.userId) {
    const error = new ErrorResponse('The data of the todo is incomplete.', 400);
    throw error;
  }

  if (!Types.ObjectId.isValid(todo._id)) {
    const error = new ErrorResponse('The _id of the todo is wrong.', 400);
    throw error;
  }

  if (!Types.ObjectId.isValid(todo.userId)) {
    const error = new ErrorResponse('The userId is wrong.', 400);
    throw error;
  }

  if (todo.userId != user._id) {
    const error = new ErrorResponse(
      'Attempting to update a todo that does not belong to you.',
      400
    );
    throw error;
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    todo._id,
    { name: todo.name, done: todo.done },
    { new: true }
  );

  return updatedTodo;
};

export const deleteTodo = async (todo, user) => {};

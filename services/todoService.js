import Todo from '../model/Todo.js';
import mongoose from 'mongoose';

import { ADMIN, SUPER, USER } from '../config/roles.js';
import ErrorResponse from '../utils/ErrorResponse.js';
const { Types } = mongoose;

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

export const updateTodo = async (todoId, newData, user) => {
  let todo;

  if (!Types.ObjectId.isValid(todoId)) {
    throw new ErrorResponse('The id of the todo is invalid.', 400);
  }

  try {
    todo = await Todo.findById(todoId);
  } catch (error) {
    throw new ErrorResponse(`There is no todo with the id: ${todoId}`, 401);
  }

  if (String(todo.userId) !== String(user._id)) {
    throw new ErrorResponse('The todo does not belong to you.', 400);
  }

  newData = {
    name: newData?.name || todo.name,
    done: newData?.done || todo.done,
  };

  console.log(newData);

  return await Todo.findByIdAndUpdate(todo._id, newData, { new: true });
};

export const deleteTodo = async (todoId, user) => {
  let todo;

  if (!Types.ObjectId.isValid(todoId)) {
    const error = new ErrorResponse('The Id of the todo is invalid.', 401);
    throw error;
  }

  try {
    todo = await Todo.findById(todoId);
  } catch (err) {
    const error = new ErrorResponse(`There is no Todo with the Id: ${todoId}`);
    throw error;
  }

  console.log(todo.userId);
  console.log(user._id);

  if (String(todo.userId) !== String(user._id)) {
    const error = new ErrorResponse(
      'Attempting to delete a todo that does not belong to you.',
      400
    );
    throw error;
  }

  const deletedTodo = await Todo.findByIdAndDelete(todoId);

  return deletedTodo;
};

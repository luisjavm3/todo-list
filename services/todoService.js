import Todo from '../model/Todo.js';
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
  const findAllAsASuper = [];

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

  return await Todo.aggregate(findAllAsAUser);
};

export const createTodo = async (todo) => {
  try {
    return await Todo.create(todo);
  } catch (error) {
    throw error;
  }
};

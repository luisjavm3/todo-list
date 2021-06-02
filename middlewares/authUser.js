import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';

/**
 * It Authenticate users, based on the token's payload that contains the user's id.
 */
const authUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const ACCESS_TOKEN_SECRECT = process.env.ACCESS_TOKEN_SECRECT;

  if (!authorization || !authorization.startsWith('Bearer')) {
    const error = new ErrorResponse('Provide a authorization mean.', 401);
    return next(error);
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    const error = new ErrorResponse('Provide a token.', 400);
    return next(error);
  }

  try {
    // This return the user's id from the token's payload.    ↓↓↓
    const { _id } = jwt.verify(token, ACCESS_TOKEN_SECRECT);
    const user = await User.findById(_id);

    if (!user) {
      const error = new ErrorResponse('The user does not exist anymore.', 400);
      return next(error);
    }

    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

export default authUser;

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import User from '../model/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import { ADMIN, SUPER } from '../config/roles.js';
const { Types } = mongoose;

/**
 * This method only changes the role or the password of the user.
 */
export const updateUser = async (LoggedUser, newData, userId) => {
  let user;

  if (!Types.ObjectId.isValid(userId)) {
    throw new ErrorResponse(`${userID} is not a valid Id.`, 400);
  }

  if (!newData.role && !newData.password) {
    throw new ErrorResponse('Insert new data to update.');
  }

  try {
    user = await User.findById(userId);
  } catch (error) {
    throw new ErrorResponse(`Could not find a user with the Id: ${userId}.`);
  }

  if ([ADMIN, SUPER].includes(user.role) && LoggedUser.role === ADMIN) {
    throw new ErrorResponse('Access Forbidden.', 403);
  }

  // Due the password cannot be decrypted, we need to know whether it has been changed.
  if (newData.password) {
    if (newData.password.length < 6 || typeof newData.password !== 'string') {
      throw new ErrorResponse(
        'The password must be a string of at least 6 characters.',
        400
      );
    }

    const salt = await bcrypt.genSalt(10);
    newData.password = await bcrypt.hash(newData.password, salt);

    newData = {
      role: newData?.role || user.role,
      password: newData.password,
    };
  } else {
    newData = {
      role: newData.role,
    };
  }

  return await User.findByIdAndUpdate(userId, newData, {
    new: true,
    runValidators: true,
  });
};

export const deleteUser = async (LoggedUser, userId) => {
  let user;

  if (!Types.ObjectId.isValid(userId)) {
    throw new ErrorResponse(`${userID} is not a valid Id.`, 400);
  }

  try {
    user = await User.findById(userId);
  } catch (error) {
    throw new ErrorResponse(`Could not find a user with the Id: ${userId}.`);
  }

  if ([ADMIN, SUPER].includes(user.role) && LoggedUser.role === ADMIN) {
    throw new ErrorResponse('Access Forbidden.', 403);
  }

  return await User.findByIdAndDelete(userId);
};

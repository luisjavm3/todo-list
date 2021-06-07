import { deleteUser, updateUser } from '../services/userService.js';

export const updateUserController = async (req, res, next) => {
  // User logged in the system ↓↓↓
  const user = req.user;
  // User's id to update ↓↓↓
  const { userId } = req.params;
  const newData = req.body;
  let updatedUser;

  try {
    updatedUser = await updateUser(user, newData, userId);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ success: true, user: updatedUser });
};

export const deleteUserController = async (req, res, next) => {
  // User logged in the system ↓↓↓
  const user = req.user;
  // User's id to delete ↓↓↓
  const { userId } = req.params;
  let deletedUser;

  try {
    deletedUser = await deleteUser(user, userId);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ success: true, user: deletedUser });
};

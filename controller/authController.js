import User from '../model/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const signupController = async (req, res, next) => {
  const user = req.body;

  try {
    const newUser = await User.create(user);
    const token = newUser.generateToken();

    res.status(201).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (!username || !password) {
    const error = new ErrorResponse('Provide both username and password', 400);
    return next(error);
  }

  try {
    const user = await User.findOne({ username }, 'password');

    if (!user || !user.isMatch(password)) {
      return next(new ErrorResponse('Wrong credentials.', 404));
    }

    const token = user.generateToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

export const logoutController = (req, res, next) => {
  res.status(200).json({ message: 'Logout route' });
};

export const refreshTokenController = (req, res, next) => {
  res.status(200).json({ message: 'refresh-token' });
};

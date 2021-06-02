import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username required.'],
      unique: [true, 'This username already exists.'],
      minLength: [4, 'Username must be at least 4 characters.'],
      maxLength: [20, 'Username must be less than or equal to 20 characters.'],
    },
    password: {
      type: String,
      required: [true, 'Insert a password is mandatory.'],
      minLength: [6, 'Password must be at least 6 chraracters.'],
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'super'],
      default: 'user',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.generateToken = function () {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const ACCESS_TOKEN_EXPIRATION_TIME = process.env.ACCESS_TOKEN_EXPIRATION_TIME;
  const payload = { _id: this._id };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

UserSchema.methods.isMatch = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;

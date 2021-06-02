import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Todo name is required.'],
      minLength: [4, 'Todo must be at least 4 characters.'],
      maxLength: [20, 'Todo must be less tahn or equal to 20 characters.'],
      nullable: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Todo must have a userId.'],
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;

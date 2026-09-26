import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
      minLength: [3, 'name must be at least 3 characters long'],
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique:true,
      trim: true,
      lowercase: true,
      index: true,
      validate: [/^[a-zA-Z][a-zA-Z0-9]*$/, 'username must be alphanumeric'],
      minLength: [3, 'username must be at least 3 characters long'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      validate: [
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        'invalid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minLength: [6, 'password must be at least 6 characters long'],
      select: false,
    },
  },
  { timestamps: true }
);

// Hash password
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * @name isValidPassword
 * @desc Check if password is valid
 * @param {string} password - Password to check
 * @returns {boolean} - True if password is valid, false otherwise
 */
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

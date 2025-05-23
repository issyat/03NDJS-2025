import mongoose, { model } from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/, 'Password must include uppercase, lowercase, number, and special character'],
    maxlength: [32, 'Password must be at most 32 characters']
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// Creating the User model using the defined schema
const User = model('User', userSchema);

// Exporting the User model for use in other parts of the application
export default User;

import mongoose from 'mongoose';

const User = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Insira um email'],
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Insira um nome'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Insira uma senha'],
  },
  is_active: {
    type: Boolean,
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', User);

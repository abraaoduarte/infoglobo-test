import mongoose from 'mongoose';

const News = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Insira um Título'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Insira o conteúdo'],
    trim: true,
  },
  publication_date: {
    type: Date,
    required: [true, 'Insira a data da publicação'],
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

export default mongoose.model('News', News);

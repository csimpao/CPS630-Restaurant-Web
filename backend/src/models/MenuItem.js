import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  id:       { type: String, required: true, unique: true },
  name:     { type: String, required: true },
  category: { type: String, required: true },
  price:    { type: Number, required: true },
});

export default mongoose.model('MenuItem', menuItemSchema);

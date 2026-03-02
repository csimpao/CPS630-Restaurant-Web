import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  id:       { type: String, required: true },
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId:  { type: String, required: true },
  order:   { type: Map, of: orderItemSchema },
});

orderSchema.index({ userId: 1, orderId: 1 }, { unique: true });

export default mongoose.model('Order', orderSchema);

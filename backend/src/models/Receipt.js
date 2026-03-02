import mongoose from 'mongoose';

const receiptItemSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true },
}, { _id: false });

const receiptSchema = new mongoose.Schema({
  receiptId: { type: String, required: true },
  userId:    { type: String, required: true },
  receipt:   { type: [receiptItemSchema], required: true },
});

receiptSchema.index({ userId: 1, receiptId: 1 }, { unique: true });

export default mongoose.model('Receipt', receiptSchema);

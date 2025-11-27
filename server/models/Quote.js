import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  propertyType: { type: String, required: true },
  numRooms: { type: String },
  cleaningFrequency: { type: String },
  preferredDate: { type: String },
  service: { type: String, required: true },
  message: { type: String, required: true },
  specialInstructions: { type: String },
}, { timestamps: true });

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;
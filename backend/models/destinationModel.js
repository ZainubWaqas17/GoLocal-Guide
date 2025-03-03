import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  rating: { type: Number, default: 0 },
  amenities: [{ type: String }],
  availability: { type: Boolean, default: true },
  subImages: [{ type: String }],
  description: { type: String },
}, { timestamps: true });

export default mongoose.model('Destination', destinationSchema);

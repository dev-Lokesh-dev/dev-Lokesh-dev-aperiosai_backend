import mongoose from 'mongoose';

const retailerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
}, { timestamps: true });

const Retailer = mongoose.model('Retailer', retailerSchema);

export default Retailer;

const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: false
  },
  speciality: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: false
  },
  languages: {
    type: [String],
    default: ['हिंदी']
  },
  fees: {
    type: Number,
    required: false,
    default: 500
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  },
  address: {
    type: String,
    required: false
  },
  pincode: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema); 
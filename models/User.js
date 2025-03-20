const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  userType: {
    type: String,
    enum: ['patient', 'doctor', 'pharmacy', 'lab'],
    default: 'patient'
  },
  age: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: false
  },
  speciality: {
    type: String,
    required: function() { return this.userType === 'doctor'; }
  },
  licenseNumber: {
    type: String,
    required: function() { 
      return ['doctor', 'pharmacy', 'lab'].includes(this.userType); 
    }
  },
  address: {
    type: String,
    required: false
  },
  pincode: {
    type: String,
    required: false
  },
  isVerified: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model('User', UserSchema); 
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/health_connect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Define Schemas and Models
const userSchema = new mongoose.Schema({
  uid: String,
  phoneNumber: { type: String, unique: true },
  name: String,
  email: String,
  userType: { type: String, enum: ['patient', 'doctor', 'pharmacy', 'lab'] },
  age: String,
  gender: String,
  speciality: String,
  licenseNumber: String,
  address: String,
  pincode: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const doctorSchema = new mongoose.Schema({
  uid: String,
  phoneNumber: { type: String, unique: true },
  name: String,
  speciality: String,
  licenseNumber: String,
  isVerified: { type: Boolean, default: false },
  status: { type: String, default: 'pending' },
  address: String,
  pincode: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const pharmacySchema = new mongoose.Schema({
  uid: String,
  phoneNumber: { type: String, unique: true },
  name: String,
  licenseNumber: String,
  isVerified: { type: Boolean, default: false },
  status: { type: String, default: 'pending' },
  address: String,
  pincode: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const labSchema = new mongoose.Schema({
  uid: String,
  phoneNumber: { type: String, unique: true },
  name: String,
  licenseNumber: String,
  isVerified: { type: Boolean, default: false },
  status: { type: String, default: 'pending' },
  address: String,
  pincode: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', userSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);
const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
const Lab = mongoose.model('Lab', labSchema);

// API Routes
// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user by phoneNumber
app.get('/api/users/:phoneNumber', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.params.phoneNumber });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get doctor by phoneNumber
app.get('/api/doctors/:phoneNumber', async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ phoneNumber: req.params.phoneNumber });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new doctor
app.post('/api/doctors', async (req, res) => {
  const doctor = new Doctor(req.body);
  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all pharmacies
app.get('/api/pharmacies', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all labs
app.get('/api/labs', async (req, res) => {
  try {
    const labs = await Lab.find();
    res.json(labs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Basic Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

// Agora token generation endpoint
app.post('/api/generate-token', (req, res) => {
  // Agora token generation logic will be implemented here
  res.status(200).json({ token: 'sample-token' });
});

// Doctor listings - Using MongoDB now
app.get('/api/doctors-list', async (req, res) => {
  try {
    // This route will be replaced by the doctors API
    res.status(200).json({
      doctors: [
        {
          id: '1',
          name: 'डॉ. अमिता शर्मा',
          specialty: 'स्त्री रोग विशेषज्ञ',
          experience: '15 वर्ष',
          languages: ['हिंदी', 'भोजपुरी', 'अंग्रेजी'],
          fees: 500,
          rating: 4.8,
          available: true,
          verified: true
        },
        {
          id: '2',
          name: 'डॉ. राजेश कुमार',
          specialty: 'बाल रोग विशेषज्ञ',
          experience: '10 वर्ष',
          languages: ['हिंदी', 'अंग्रेजी'],
          fees: 400,
          rating: 4.5,
          available: true,
          verified: true
        }
      ]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Health camps
app.get('/api/health-camps', (req, res) => {
  // This will be replaced with MongoDB data fetching
  res.status(200).json({
    camps: [
      {
        id: '1',
        name: 'ग्रामीण स्वास्थ्य शिविर',
        location: 'प्राथमिक स्वास्थ्य केंद्र, पटना',
        date: '2023-12-15',
        time: '10:00 AM - 4:00 PM',
        specialists: ['बाल रोग विशेषज्ञ', 'स्त्री रोग विशेषज्ञ'],
        registration_required: true
      }
    ]
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 
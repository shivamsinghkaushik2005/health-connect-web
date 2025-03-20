const express = require('express');
const router = express.Router();
const Doctor = require('../../models/Doctor');

// @route   GET api/doctors
// @desc    Get all doctors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({ isVerified: true }).select('-__v');
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/doctors/all
// @desc    Get all doctors (including unverified)
// @access  Private/Admin
router.get('/all', async (req, res) => {
  try {
    const doctors = await Doctor.find().select('-__v');
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/doctors/:id
// @desc    Get doctor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-__v');
    
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/doctors/specialty/:specialty
// @desc    Get doctors by specialty
// @access  Public
router.get('/specialty/:specialty', async (req, res) => {
  try {
    const doctors = await Doctor.find({ 
      speciality: req.params.specialty,
      isVerified: true 
    }).select('-__v');
    
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/doctors
// @desc    Create or update doctor
// @access  Private
router.post('/', async (req, res) => {
  const {
    uid,
    name,
    phoneNumber,
    email,
    speciality,
    experience,
    languages,
    fees,
    licenseNumber,
    address,
    pincode
  } = req.body;

  // Build doctor object
  const doctorFields = {};
  if (uid) doctorFields.uid = uid;
  if (name) doctorFields.name = name;
  if (phoneNumber) doctorFields.phoneNumber = phoneNumber;
  if (email) doctorFields.email = email;
  if (speciality) doctorFields.speciality = speciality;
  if (experience) doctorFields.experience = experience;
  if (languages) doctorFields.languages = languages;
  if (fees) doctorFields.fees = fees;
  if (licenseNumber) doctorFields.licenseNumber = licenseNumber;
  if (address) doctorFields.address = address;
  if (pincode) doctorFields.pincode = pincode;
  doctorFields.updatedAt = Date.now();

  try {
    let doctor = await Doctor.findOne({ phoneNumber });

    if (doctor) {
      // Update
      doctor = await Doctor.findOneAndUpdate(
        { phoneNumber },
        { $set: doctorFields },
        { new: true }
      );

      return res.json(doctor);
    }

    // Create
    doctor = new Doctor(doctorFields);
    await doctor.save();
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/doctors/verify/:id
// @desc    Verify a doctor
// @access  Private/Admin
router.put('/verify/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          isVerified: true,
          status: 'approved',
          updatedAt: Date.now()
        } 
      },
      { new: true }
    );
    
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/doctors/rate/:id
// @desc    Rate a doctor
// @access  Private
router.put('/rate/:id', async (req, res) => {
  const { rating } = req.body;
  
  try {
    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    
    const newRatingCount = doctor.ratingCount + 1;
    const newRating = (doctor.rating * doctor.ratingCount + Number(rating)) / newRatingCount;
    
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          rating: newRating.toFixed(1),
          ratingCount: newRatingCount,
          updatedAt: Date.now()
        } 
      },
      { new: true }
    );
    
    res.json(updatedDoctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/doctors/:id
// @desc    Delete doctor
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Doctor removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/phone/:phoneNumber
// @desc    Get user by phone number
// @access  Private
router.get('/phone/:phoneNumber', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.params.phoneNumber }).select('-__v');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users
// @desc    Create or update user
// @access  Private
router.post('/', async (req, res) => {
  const {
    uid,
    name,
    email,
    phoneNumber,
    userType,
    age,
    gender,
    speciality,
    licenseNumber,
    address,
    pincode
  } = req.body;

  // Build user object
  const userFields = {};
  if (uid) userFields.uid = uid;
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (phoneNumber) userFields.phoneNumber = phoneNumber;
  if (userType) userFields.userType = userType;
  if (age) userFields.age = age;
  if (gender) userFields.gender = gender;
  if (speciality) userFields.speciality = speciality;
  if (licenseNumber) userFields.licenseNumber = licenseNumber;
  if (address) userFields.address = address;
  if (pincode) userFields.pincode = pincode;
  userFields.updatedAt = Date.now();

  try {
    let user = await User.findOne({ phoneNumber });

    if (user) {
      // Update
      user = await User.findOneAndUpdate(
        { phoneNumber },
        { $set: userFields },
        { new: true }
      );

      return res.json(user);
    }

    // Create
    user = new User(userFields);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const StringData = require('../models/stringSchema'); // Import model

// Route to save a string
router.post('/save-string', async (req, res) => {
  const { value } = req.body;

  if (!value) {
    return res.status(400).json({ message: 'String value is required.' });
  }

  try {
    const newString = new StringData({ value });
    await newString.save();
    res.status(201).json({ message: 'String saved successfully.', data: newString });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
});

// Route to retrieve the last saved string
router.get('/get-string', async (req, res) => {
  try {
    const lastString = await StringData.findOne().sort({ _id: -1 }); // Get the latest entry
    if (!lastString) {
      return res.status(404).json({ message: 'No string found.' });
    }
    res.status(200).json({ data: lastString });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
});

module.exports = router;

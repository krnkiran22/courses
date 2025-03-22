const express = require('express');
const router = express.Router();
const Wallet = require('../models/wallet'); // Adjust the path as necessary

// Route to add a new wallet address
router.post('/add-wallet', async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ message: 'Wallet address is required.' });
  }

  try {
    // Check if the wallet address already exists
    const existingWallet = await Wallet.findOne({ walletAddress });
    if (existingWallet) {
      return res.status(409).json({ message: 'Wallet address already exists.' });
    }

    // Create a new wallet entry
    const newWallet = new Wallet({ walletAddress });
    await newWallet.save();

    res.status(201).json({ message: 'Wallet address added successfully.', wallet: newWallet });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
});

module.exports = router;

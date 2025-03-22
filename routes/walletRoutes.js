const express = require('express');
const router = express.Router();
const Wallet = require('../models/walletSchema'); // Adjust the path as necessary

const Web3 = require('web3');

// Connect to the Ethereum network (e.g., using Infura)
const web3 = new Web3('https://mainnet.infura.io/v3/abc4d5d4470e4548be3599ac5e85a19e');

// Function to get wallet balance
async function getWalletBalance(walletAddress) {
  try {
    // Get the balance in Wei
    const balanceWei = await web3.eth.getBalance(walletAddress);
    // Convert the balance to Ether
    const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
    return balanceEther;
  } catch (error) {
    console.error('Error retrieving wallet balance:', error);
    throw error;
  }
}



// Route to add a new wallet address and its balance
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

    // Retrieve the wallet balance
    const balance = await getWalletBalance(walletAddress);

    // Create a new wallet entry with the balance
    const newWallet = new Wallet({ walletAddress, balance });
    await newWallet.save();

    res.status(201).json({ message: 'Wallet address and balance added successfully.', wallet: newWallet });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
});

module.exports = router;

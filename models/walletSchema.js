const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  balance: { type: String, required: true }
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const courseRoutes = require('../routes/courseRoutes');
const walletRoutes = require('../routes/walletRoutes');
const stringRoutes = require('../routes/stringRoutes');
const app = express();
app.use(express.json());
app.use(cors());
const MONGO_URI = "mongodb+srv://kirandev2210:kirankiran@nambathan.1c8b9.mongodb.net/?retryWrites=true&w=majority&appName=nambathan";
// MongoDB Connection
mongoose.connect(MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/courses', courseRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/strings', stringRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

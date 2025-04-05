// server/server.js

require('dotenv').config(); // Load .env file FIRST (important for local dev)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// Use Render's PORT environment variable OR the one from .env OR default
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing JSON request bodies

// --- MongoDB Connection ---
// It will now primarily use the MONGODB_URI set in Render's Environment Variables
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error("MongoDB URI not found. Make sure MONGODB_URI is set in environment variables.");
    // Optional: Exit process if DB connection is critical for startup
    // process.exit(1);
} else {
    mongoose.connect(mongoUri)
      .then(() => console.log('MongoDB Connected Successfully!'))
      .catch(err => console.error('MongoDB Connection Error:', err)); // Log error but try to continue server?
}


// --- Mongoose Schema and Model for Messages ---
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});
const ContactMessage = mongoose.model('ContactMessage', messageSchema);

// --- API Routes ---

// --- FIX: Add Root Route Handler ---
app.get('/', (req, res) => {
  // Send a simple confirmation for GET requests to the base URL
  res.status(200).send('Portfolio Backend Running!');
});
// --- END FIX ---

// Test API route
app.get('/api', (req, res) => {
  res.json({ message: 'Backend API is responding!' });
});

// POST route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    console.log('Message saved:', newMessage._id); // Log saved message ID
    res.status(201).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Failed to save message. Please try again later.' });
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
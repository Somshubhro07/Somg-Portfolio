// server/server.js

import 'dotenv/config'; // Load environment variables from .env file
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001; // Use port from .env or default to 5001

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing JSON request bodies

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// --- Mongoose Schema and Model for Messages ---
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

// The collection name will be 'contactmessages' (pluralized from 'ContactMessage')
const ContactMessage = mongoose.model('ContactMessage', messageSchema);

// --- API Routes ---

// Simple test route
app.get('/api', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// POST route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  // Basic validation
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Create a new message document
    const newMessage = new ContactMessage({
      name: name,
      email: email,
      message: message
    });

    // Save it to the database
    await newMessage.save();

    console.log('Message saved:', newMessage);
    // Send success response
    res.status(201).json({ message: 'Message received successfully!' });

  } catch (error) {
    console.error('Error saving message:', error);
    // Send error response
    res.status(500).json({ message: 'Failed to save message. Please try again later.' });
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
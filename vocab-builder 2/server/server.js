// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Load model BEFORE route setup
global.Vocab = require('./api/models/vocabModel');

// Load routes
const routes = require('./api/routes/vocabRoutes');

// App + Port
const app = express();
const port = process.env.PORT || 3000;

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- MongoDB Connection ---
mongoose.set('strictQuery', true);

const PASSWORD = encodeURIComponent('Conan4869');
const URI = `mongodb+srv://anhvt:${PASSWORD}@cluster0.7rolvvh.mongodb.net/?appName=Cluster0`;

mongoose
  .connect(URI, { dbName: 'vocab-builderDB' })
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- Routes ---
routes(app);


// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/`);
});

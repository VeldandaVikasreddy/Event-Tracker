require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Body parser for JSON requests

// Routes
app.use('/api/events', eventRoutes);

// Basic root route
app.get('/', (req, res) => {
    res.send('Mini Event Finder Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
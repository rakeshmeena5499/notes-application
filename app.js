const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const authenticateToken = require('./middleware/authenticateToken');

const app = express();
const port = process.env.PORT || 3000;

// Connect to DB
mongoose.connect('mongodb://localhost/notes_application', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.use(bodyParser.json());

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
});
app.use('/api/', limiter);

// User Routes
const userRoutes = require('./routes/user'); 
app.use('/api/auth', userRoutes);

// Note Routes
const noteRoutes = require('./routes/note');
app.use('/api/notes', noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

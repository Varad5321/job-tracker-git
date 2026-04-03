const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const cors = require('cors');


// Connect DB
connectDB();

app.use(cors());

app.use(express.json());

// Routes
app.use('/api', jobRoutes);
app.use('/api/auth', authRoutes);

// ✅ Test route (OUTSIDE listen)
app.post('/test', (req, res) => {
    res.send('Test route working');
});
app.get('/check', (req, res) => {
    res.send("Server alive");
});



// Home route
app.get('/', (req, res) => {
    res.send('Backend running');
});

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
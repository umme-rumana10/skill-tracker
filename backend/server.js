const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const skillRoutes = require('./routes/skillRoutes');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI ;



app.use(cors({
  origin: 'https://skill-tracker-frontend.onrender.com', // replace with your actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],       // allowed HTTP methods
  credentials: true                                // if you need to send cookies/auth headers
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Skill Development & Certification Tracker API');
});

app.use('/api/skills', skillRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err.message);
});

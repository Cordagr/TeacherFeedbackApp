const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });


const dbURI = process.env.DB_URI

// Connect to MongoDB using mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = connectDB;

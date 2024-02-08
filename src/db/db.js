// db.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose'

async function connectToDatabase() {
  try {
    const uri = 'mongodb+srv://tamana:tamana@cluster0.o8fimnz.mongodb.net/picss-app?retryWrites=true&w=majority';
    await mongoose.connect(uri);

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection is open');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}

module.exports = {connectToDatabase};

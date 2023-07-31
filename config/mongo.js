const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = async () => {
  const DB_URI = `mongodb+srv://ozz129:${process.env.DB_PASSWORD}@cluster0.a5prr.mongodb.net/aereal_meds?retryWrites=true&w=majority`
  mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
};

module.exports = dbConnect;
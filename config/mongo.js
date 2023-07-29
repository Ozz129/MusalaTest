const mongoose = require("mongoose");

const dbConnect = async () => {
  const DB_URI = `mongodb+srv://ozz129:OAau3W4cVagaAlbm@cluster0.a5prr.mongodb.net/?retryWrites=true&w=majority`
  mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
};

module.exports = dbConnect;
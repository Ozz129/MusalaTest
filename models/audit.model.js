const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    drone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drone',
    },
    event: String,
    batteryLevel: Number,
    timestamp: Date,
  });
  
 module.exports = mongoose.model('auditLog', auditLogSchema);
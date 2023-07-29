const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const dispatchSchema = new mongoose.Schema({
  drone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'drone',
    required: true,
  },
  medicamentos: [{
    medicamento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'med',
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
  }],
  destino: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

dispatchSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model('dispatch', dispatchSchema);;

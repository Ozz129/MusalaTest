const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const DroneSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
    },
    load: {
      type: Number,
    },
    capacity: {
      type: Number,
    },
    batteryStatus: {
      type: Number
    },
    identifier: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

DroneSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("drone", DroneSchema);

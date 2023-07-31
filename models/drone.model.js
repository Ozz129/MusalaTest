const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const DroneSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
    },
    loadStatus: {
      type: Boolean,
    },
    capacity: {
      type: Number,
    },
    batteryStatus: {
      type: Boolean
    },
    battery: {
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

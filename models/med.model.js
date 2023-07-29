const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const MedSchema = new mongoose.Schema(
  {
    serial: {
      type: String,
    },
    name: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

MedSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("med", MedSchema);

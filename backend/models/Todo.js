const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["completed", "ongoing"],
    default: "ongoing"
  }
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);

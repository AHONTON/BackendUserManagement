const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  gmailId: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String },
  body: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);

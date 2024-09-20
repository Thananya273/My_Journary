const mongoose = require('mongoose');

const plannerSchema = new mongoose.Schema({
  day: { type: Date, required: true },
  place: { type: String, required: true },
  time: { type: String },
  placeInfo: { type: String },
  picture: { type: String },
  activity: { type: String },
  howToGo: { type: String },
  reminder: { type: String },
  checklist: [{ type: String }]
});

const Planner = mongoose.models.planner || mongoose.model("planner", plannerSchema);
module.exports = Planner;

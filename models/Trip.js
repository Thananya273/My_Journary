const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: String, required: true },
  country : { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  note: [{ type: String }],
  budget: { type: Number },
  status : [{ type: String }],
  picture : [{ type: String }],
});

const Trip = mongoose.models.trip || mongoose.model("trip", tripSchema);

module.exports = Trip;

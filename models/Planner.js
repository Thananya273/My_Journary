import mongoose from 'mongoose';

const plannerSchema = new mongoose.Schema({
  place: { type: String, required: true },
  time: { type: String },
  placeInfo: { type: String },
  activity: { type: String },
  reminder: { type: String },
  tripId: { type: String, required: true },
  date: { type: Date, required: true },
  GoogleMap: { type: String }
});

export default mongoose.models.Planner || mongoose.model('Planner', plannerSchema);

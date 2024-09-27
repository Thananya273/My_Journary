// File: models/Diary.js
import mongoose from 'mongoose';

const diarySchema = new mongoose.Schema({
  tripId: { type: String, required: true },
  place: { type: String, required: false },
  emotion: { type: Number, required: false },
  diary: { type: String, required: true },
  photo: { type: String},
  date: { type: Date, required: true }
});

const Diary = mongoose.models.Diary || mongoose.model('Diary', diarySchema);

export default Diary;


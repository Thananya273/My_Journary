// File: models/Diary.js
import mongoose from 'mongoose';

const diarySchema = new mongoose.Schema({
  tripId: { type: String, required: true },
  emotion: { type: Number, required: true },
  diary: { type: String, required: true },
  photo: { type: String, required: false }
});

const Diary = mongoose.models.Diary || mongoose.model('Diary', diarySchema);

export default Diary;


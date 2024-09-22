"use client";
import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const DiaryForm = ({ onSave }) => {
  const [emotion, setEmotion] = useState(null);
  const [diary, setDiary] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emotion !== null && diary) {
      onSave({ emotion, diary, photo });
      setEmotion(null); // Reset emotion
      setDiary(''); // Clear diary input
      setPhoto(''); // Clear photo input
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Select Emotion</Typography>
        <Box>
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={emotion === num ? 'contained' : 'outlined'}
              onClick={() => setEmotion(num)}
              sx={{ mr: 1 }}
            >
              {num}
            </Button>
          ))}
        </Box>
      </Box>
      <TextField
        label="Diary Entry"
        value={diary}
        onChange={(e) => setDiary(e.target.value)}
        fullWidth
        multiline
        rows={4}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Photo URL (optional)"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Save Diary
      </Button>
    </form>
  );
};

export default DiaryForm;

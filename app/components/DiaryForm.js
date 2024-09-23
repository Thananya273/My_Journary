"use client";
import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { MoodBadOutlined, SentimentDissatisfiedOutlined, SentimentNeutralOutlined, SentimentSatisfiedOutlined, SentimentVerySatisfiedOutlined } from '@mui/icons-material';


const DiaryForm = ({ onSave }) => {
  const [emotion, setEmotion] = useState(null);
  const [diary, setDiary] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emotion !== null && diary) {
      onSave({ emotion, diary, photo });
      setEmotion(null); 
      setDiary(''); 
      setPhoto(''); 
    }
  };
  const emotions = [
    { num: 1, icon: <MoodBadOutlined />, label: 'Bad' },
    { num: 2, icon: <SentimentDissatisfiedOutlined />, label: 'Poor' },
    { num: 3, icon: <SentimentNeutralOutlined />, label: 'Neutral' },
    { num: 4, icon: <SentimentSatisfiedOutlined />, label: 'Good' },
    { num: 5, icon: <SentimentVerySatisfiedOutlined />, label: 'Excellent' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 2 }}>
        <Box>
          {emotions.map((emotionItem) => (
            <Button
              key={emotionItem.num}
              variant={emotion === emotionItem.num ? 'contained' : 'outlined'}
              onClick={() => setEmotion(emotionItem.num)}
              sx={{ mr: 1 }}
              aria-label={emotionItem.label} // Add accessible label
            >
              {emotionItem.icon}
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

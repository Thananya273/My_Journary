"use client";
import { useEffect, useState } from 'react';
import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import { MoodBadOutlined, SentimentDissatisfiedOutlined, SentimentNeutralOutlined, SentimentSatisfiedOutlined, SentimentVerySatisfiedOutlined } from '@mui/icons-material';

export default function DiaryUpdate({ diary, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    diary: '',
    photo: '',
    emotion: null,
  });

  useEffect(() => {
    console.log("Diary data received:", diary);
    if (diary) {
      setFormData(diary);
    }
  }, [diary]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmotionChange = (emotionValue) => {
    setFormData(prev => ({ ...prev, emotion: emotionValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!diary || !diary._id) {
      console.error("Diary ID is missing.");
      return; // Exit if there's no ID
    }
  
    onSave({ ...formData, _id: diary._id }); // Ensure you're passing the _id
  };
  
  

  const emotions = [
    { num: 1, icon: <MoodBadOutlined />, label: 'Bad' },
    { num: 2, icon: <SentimentDissatisfiedOutlined />, label: 'Poor' },
    { num: 3, icon: <SentimentNeutralOutlined />, label: 'Neutral' },
    { num: 4, icon: <SentimentSatisfiedOutlined />, label: 'Good' },
    { num: 5, icon: <SentimentVerySatisfiedOutlined />, label: 'Excellent' },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Diary Entry"
            name="diary"
            value={formData.diary || ''} // Default to empty string
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Photo URL (optional)"
            name="photo"
            value={formData.photo || ''} // Default to empty string
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Select Emotion</Typography>
          <Box>
            {emotions.map((emotionItem) => (
              <Button
                key={emotionItem.num}
                variant={formData.emotion === emotionItem.num ? 'contained' : 'outlined'}
                onClick={() => handleEmotionChange(emotionItem.num)}
                sx={{ mr: 1 }}
                aria-label={emotionItem.label}
              >
                {emotionItem.icon}
              </Button>
            ))}
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">Save</Button>
        <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ ml: 2 }}>Cancel</Button>
      </Box>
    </Box>
  );
}

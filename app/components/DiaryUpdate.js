"use client";
import { useEffect, useState } from 'react';
import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import MoodBadOutlined from '@mui/icons-material/MoodBadOutlined';
import SentimentDissatisfiedOutlined from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentNeutralOutlined from '@mui/icons-material/SentimentNeutralOutlined';
import SentimentSatisfiedOutlined from '@mui/icons-material/SentimentSatisfiedOutlined';
import SentimentVerySatisfiedOutlined from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import PropTypes from 'prop-types';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-icon': {
    fontSize: '2rem', // Increase the size of the icons
  },
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
  '& .MuiRating-iconFilled': {
    fontSize: '2rem', // Ensure filled icons are also larger
  },
}));

const customIcons = {
  1: {
    icon: <MoodBadOutlined color="error" fontSize="inherit" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedOutlined color="error" fontSize="inherit" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentNeutralOutlined color="warning" fontSize="inherit" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedOutlined color="success" fontSize="inherit" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedOutlined color="success" fontSize="inherit" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function DiaryUpdate({ diary, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    diary: '',
    photo: '',
    emotion: null,
    date: '',
    place: '', // Change this to a normal text field
  });

  useEffect(() => {
    if (diary) {
      setFormData({
        diary: diary.diary || '',
        photo: diary.photo || '',
        emotion: diary.emotion || null,
        date: diary.date.split('T')[0],
        place: diary.place || '', // Initialize place
      });
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

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Place"
            name="place"
            value={formData.place || ''} // Default to empty string
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ mt: 1 }}>
            <StyledRating
              name="emotion-rating"
              value={formData.emotion}
              IconContainerComponent={IconContainer}
              highlightSelectedOnly
              onChange={(event, newValue) => handleEmotionChange(newValue)} // Set the selected emotion
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Diary Entry"
            name="diary"
            value={formData.diary || ''} // Default to empty string
            onChange={handleChange}
            fullWidth
            multiline
            rows={15}
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
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">Save</Button>
        <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ ml: 2 }}>Cancel</Button>
      </Box>
    </Box>
  );
}

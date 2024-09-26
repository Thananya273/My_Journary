"use client";
import { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
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
  }
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" fontSize="inherit" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" fontSize="inherit" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" fontSize="inherit" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" fontSize="inherit" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" fontSize="inherit" />,
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

const DiaryForm = ({ onSave, tripId, onCancel }) => {
  const [emotion, setEmotion] = useState(null);
  const [diary, setDiary] = useState('');
  const [photo, setPhoto] = useState('');
  const [place, setPlace] = useState('');
  const [places, setPlaces] = useState([]);
  const [date, setDate] = useState(''); // State for date
  
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch('/api/planner');
        const data = await response.json();
        const filteredPlaces = data.filter(planner => planner.tripId === tripId);
        setPlaces(filteredPlaces.map(planner => planner.place)); // Store only the place names
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    if (tripId) {
      fetchPlaces();
    }
  }, [tripId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emotion !== null && diary && date && place) {
      onSave({ emotion, diary, photo, place, date });
      setEmotion(null); 
      setDiary(''); 
      setPhoto(''); 
      setPlace(''); // Reset place selection
      setDate(''); // Reset date
    }
  };

  const handleChipClick = (placeItem) => {
    setPlace(placeItem); // Set selected place
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 2 }}>
        {places.map((placeItem) => (
          <Chip 
            key={placeItem} 
            label={placeItem} 
            onClick={() => handleChipClick(placeItem)} 
            color={place === placeItem ? "primary" : "default"}
            sx={{ mr: 1, mb: 1, cursor: 'pointer' }}
          />
        ))}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ mt: 1 }}> {/* Move rating down with margin */}
            <StyledRating
              name="emotion-rating"
              defaultValue={4}
              IconContainerComponent={IconContainer}
              getLabelText={(value) => customIcons[value].label}
              highlightSelectedOnly
              onChange={(event, newValue) => {
                setEmotion(newValue); // Set the selected emotion
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <TextField
        label="Diary Entry"
        value={diary}
        onChange={(e) => setDiary(e.target.value)}
        fullWidth
        multiline
        rows={15}
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
      
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Save Diary
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={onCancel} 
          sx={{ ml: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default DiaryForm;

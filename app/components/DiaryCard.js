"use client";
import { Card, CardContent, Typography, Button, CardMedia, Box } from '@mui/material';
import { MoodBadOutlined, SentimentDissatisfiedOutlined, SentimentNeutralOutlined, SentimentSatisfiedOutlined, SentimentVerySatisfiedOutlined } from '@mui/icons-material';

export default function DiaryCard({ diary, onDelete, onEdit, showActions = true }) {
  const handleDelete = () => {
    onDelete(diary._id);
  };

  const handleEdit = () => {
    onEdit(diary);
  };

  const getEmotionIcon = (emotion) => {
    switch (emotion) {
      case 1:
        return <MoodBadOutlined />;
      case 2:
        return <SentimentDissatisfiedOutlined />;
      case 3:
        return <SentimentNeutralOutlined />;
      case 4:
        return <SentimentSatisfiedOutlined />;
      case 5:
        return <SentimentVerySatisfiedOutlined />;
      default:
        return null;
    }
  };

  return (
    <Card sx={{ p: 2, mb: 2 }}>
      {diary.photo && (
        <CardMedia
          component="img"
          height="140"
          image={diary.photo}
          alt="Diary Photo"
        />
      )}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ mr: 1 }}>Emotion:</Typography>
          {getEmotionIcon(diary.emotion)}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {diary.diary}
        </Typography>
      </CardContent>
      {showActions && ( // Conditionally render the buttons based on showActions prop
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outlined" color="error" sx={{ ml: 2 }} onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      )}
    </Card>
  );
}

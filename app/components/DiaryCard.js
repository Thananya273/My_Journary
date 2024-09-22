"use client";
import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';

const DiaryCard = ({ diary }) => {
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
        <Typography variant="h6">Emotion: {diary.emotion}</Typography>
        <Typography variant="body2" color="text.secondary">
          {diary.diary}
        </Typography>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default DiaryCard;

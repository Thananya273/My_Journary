"use client";
import { Card, CardContent, Typography, CardMedia, Box, IconButton } from '@mui/material';
import { MoodBadOutlined, SentimentDissatisfiedOutlined, SentimentNeutralOutlined, SentimentSatisfiedOutlined, SentimentVerySatisfiedOutlined, Edit, Delete } from '@mui/icons-material';
import 'typeface-inter';

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
    <Card 
      sx={{ 
        p: 2, mb: 2, height: 650, display: 'flex', flexDirection: 'column',
        backgroundColor: '#fcfbf2', // Light background color resembling paper
        borderRadius: '8px', // Rounded corners
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Light shadow for depth
        color: '#333', // Dark text for readability
        position: 'relative', // Enable positioning of children
        backgroundImage: 'repeating-linear-gradient(to bottom, #fcfbf2, #fcfbf2 20px, #e0e0e0 20px, #e0e0e0 21px)', // Lined paper effect
      }}
    >
      <CardContent sx={{ flex: 1, overflowY: 'scroll', pr: 2, '::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}> {/* Hide scrollbar */}
        {diary.photo && (
          <CardMedia
            component="img"
            height="140"
            image={diary.photo}
            alt="Diary Photo"
          />
        )}
        <br></br>
        <Typography 
            variant="body2" 
            color="text.primary" 
            sx={{ 
              mt: 2, 
              whiteSpace: 'pre-wrap', 
              lineHeight: '21px', 
               
              justifyContent: 'space-between',
            }}
          >
            Place: {diary.place}
        </Typography>
        <Typography 
            variant="body2" 
            color="text.primary" 
            sx={{ 
              mt: 1, 
              whiteSpace: 'pre-wrap', 
              lineHeight: '21px', 
              fontFamily: 'monospace', 
            }}
          >
            Date: {new Date(diary.date).toLocaleDateString('en-GB')}
        </Typography>
        <Typography 
            variant="body2" 
            color="text.primary" 
            sx={{ 
              mt: 1, 
              whiteSpace: 'pre-wrap', 
              lineHeight: '21px', 
              fontFamily: 'monospace', 
            }}
          >
            Emotion: {getEmotionIcon(diary.emotion)}
        </Typography>
        <br></br>
        <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mt: 1, 
              whiteSpace: 'pre-wrap', 
              lineHeight: '21px', 
              fontFamily: 'monospace', 
            }}
          >
            {diary.diary}
        </Typography>
      </CardContent>
      {showActions && ( // Conditionally render the buttons based on showActions prop
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
          <IconButton onClick={handleEdit} sx={{ color: '#3C5B6F' }}>
            <Edit />
          </IconButton>
          <IconButton onClick={handleDelete} sx={{ color: '#948979', ml: 1 }}>
            <Delete />
          </IconButton>
        </Box>
      )}
    </Card>
  );
}

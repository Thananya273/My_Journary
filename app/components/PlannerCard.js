"use client";
import { Card, CardContent, Typography, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PlannerCard({ planner, onDelete }) {
  const handleDelete = () => {
    onDelete(planner._id);
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {planner.place}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" color="text.secondary">Time: {planner.time}</Typography>
        <Typography variant="body2" color="text.secondary">Place Info: {planner.placeInfo}</Typography>
        <Typography variant="body2" color="text.secondary">Activity: {planner.activity}</Typography>
        <Typography variant="body2" color="text.secondary">Reminder: {planner.reminder}</Typography>
        <Typography variant="body2" color="text.secondary">How to Go: {planner.howToGo || 'N/A'}</Typography>
        <Typography variant="body2" color="text.secondary">Checklist: {planner.checklist.join(', ') || 'N/A'}</Typography>
        
        <IconButton 
          color="error" 
          onClick={handleDelete} 
          sx={{ mt: 2, transition: 'background-color 0.3s', '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.1)' } }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

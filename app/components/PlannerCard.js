"use client";
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PlannerCard({ planner, onDelete }) {
  const handleDelete = () => {
    onDelete(planner._id); // Call the onDelete function with the planner ID
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{planner.place}</Typography>
        <Typography variant="body2">Time: {planner.time}</Typography>
        <Typography variant="body2">Place Info: {planner.placeInfo}</Typography>
        <Typography variant="body2">Activity: {planner.activity}</Typography>
        <Typography variant="body2">Reminder: {planner.reminder}</Typography>
        <Typography variant="body2">How to Go: {planner.howToGo || 'N/A'}</Typography>
        <Typography variant="body2">Checklist: {planner.checklist.join(', ') || 'N/A'}</Typography>
        
        <IconButton color="secondary" onClick={handleDelete} sx={{ mt: 2 }}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

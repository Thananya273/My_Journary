"use client";
import { Card, CardContent, Typography, IconButton, Divider, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function PlannerCard({ planner, onDelete, onEdit, showActions }) {
  const handleDelete = () => {
    onDelete(planner._id);
  };

  const handleEdit = () => {
    onEdit(planner);
  };

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {/* Left side: Place and Time card */}
      <Grid item xs={12} sm={3}>
        <Card sx={{ boxShadow: 3, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {planner.place}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h4" color="text.secondary">{planner.time}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Right side: Additional planner information */}
      <Grid item xs={12} sm={8}>
        <Card sx={{ boxShadow: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Place Info: {planner.placeInfo}</Typography>
            <Typography variant="body2" color="text.secondary">Activity: {planner.activity}</Typography>
            <Typography variant="body2" color="text.secondary">Reminder: {planner.reminder}</Typography>
            <Typography variant="body2" color="text.secondary">How to Go: {planner.howToGo || 'N/A'}</Typography>
            <Typography variant="body2" color="text.secondary">Checklist: {planner.checklist.join(', ') || 'N/A'}</Typography>
            
            {/* Show action buttons only if showActions is true */}
            {showActions && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <IconButton color="primary" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>

                <IconButton color="error" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

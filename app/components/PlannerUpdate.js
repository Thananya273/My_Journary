"use client";
import { useEffect, useState } from 'react';
import { Button, TextField, Grid, Card, CardContent, Box, Typography} from '@mui/material';

export default function PlannerUpdate({ planner, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    place: '',
    time: '',
    placeInfo: '',
    activity: '',
    reminder: '',
    GoogleMap: '',
  });

  useEffect(() => {
    if (planner) {
      setFormData(planner); // Populate form with planner data
    }
  }, [planner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card sx={{ mt: 2, p: 2 }}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Place */}
            <Grid item xs={12} md={6}>
            <Typography variant="h6">Place</Typography>
              <TextField
                fullWidth
                name="place"
                value={formData.place}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Time */}
            <Grid item xs={12} md={6}>
            <Typography variant="h6">Time</Typography>
              <TextField
                fullWidth
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Google Maps URL */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Google Maps URL"
                name="GoogleMap"
                value={formData.GoogleMap}
                onChange={handleChange}
              />
            </Grid>

            {/* Place Information */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Place Information"
                name="placeInfo"
                value={formData.placeInfo}
                onChange={handleChange}
              />
            </Grid>

            {/* Activity */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Activity"
                name="activity"
                value={formData.activity}
                onChange={handleChange}
              />
            </Grid>

            {/* Reminder */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Reminder"
                name="reminder"
                value={formData.reminder}
                onChange={handleChange}
              />
            </Grid>

            {/* Save and Cancel Buttons */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

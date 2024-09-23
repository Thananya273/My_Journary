"use client";
import { useEffect, useState } from 'react';
import { Button, TextField, Grid, Box } from '@mui/material';

export default function PlannerUpdate({ planner, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    place: '',
    time: '',
    placeInfo: '',
    activity: '',
    howToGo: '',
    reminder: '',
    checklist: [],
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

  const handleChecklistChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, checklist: value.split(',').map(item => item.trim()) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Place Info"
            name="placeInfo"
            value={formData.placeInfo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Activity"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="How to Go"
            name="howToGo"
            value={formData.howToGo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Reminder"
            name="reminder"
            value={formData.reminder}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Checklist (comma-separated)"
            name="checklist"
            value={formData.checklist.join(', ')}
            onChange={handleChecklistChange}
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

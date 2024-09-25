"use client";
import { useEffect, useState } from 'react';
import { Button, TextField, Grid, Box, Typography } from '@mui/material';

export default function TripUpdate({ trip, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    country: '',
    startDate: '',
    endDate: '',
    note: '',
    budget: '',
    status: '',
    picture: '',
  });

  useEffect(() => {
    console.log("Trip data received:", trip);
    if (trip) {
      setFormData({
        name: trip.name,
        destination: trip.destination,
        country: trip.country,
        startDate: trip.startDate.split('T')[0], // Format for input type="date"
        endDate: trip.endDate.split('T')[0],
        note: trip.note || '',
        budget: trip.budget || '',
        status: trip.status || '',
        picture: trip.picture || ''
      });
    }
  }, [trip]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!trip || !trip._id) {
      console.error("Trip ID is missing.");
      return; // Exit if there's no ID
    }
  
    onSave({ ...formData, _id: trip._id }); // Pass the trip ID along with the data
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Update Trip</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Trip Name"
            name="name"
            value={formData.name || ''} // Default to empty string
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Destination"
            name="destination"
            value={formData.destination || ''}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={formData.country || ''}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Budget"
            type="number"
            name="budget"
            value={formData.budget || ''}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Status"
            name="status"
            value={formData.status || ''}
            onChange={handleChange}
            variant="outlined"
            placeholder="Enter statuses separated by commas"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Picture"
            name="picture"
            value={formData.picture || ''} // Default to empty string
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Note"
            name="note"
            value={formData.note || ''}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
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

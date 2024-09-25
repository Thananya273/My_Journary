"use client";
import { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function PlannerForm({ initialData = {}, date, onSave, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues: initialData });
  const [howToGo, setHowToGo] = useState(initialData.howToGo || '');

  const handleSave = (data) => {
    const formattedData = {
      ...data,
    };
    onSave(formattedData);
  };

  return (
    <Card sx={{ mt: 2, p: 2 }}>
      <CardContent>
        <form onSubmit={handleSubmit(handleSave)}>
          <Grid container spacing={2}>
            {/* Place */}
            <Grid item xs={12} md={6}>
                <Typography variant="h6">Place</Typography>
                <TextField
                  fullWidth
                  {...register('place', { required: true })}
                />
            </Grid>
            {/* Time */}
            <Grid item xs={12} md={6}>
                  <Typography variant="h6">Time</Typography>
                  <TextField
                  fullWidth
                  type="time"
                  {...register('time', { required: true })}
                />
            </Grid>
             {/* Google map url */}
             <Grid item xs={12}>
              <TextField
                fullWidth
                label="Google Maps URL"
                {...register('GoogleMap')}
              />
            </Grid>

            {/* Place Information */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Place Information"
                {...register('placeInfo')}
              />
            </Grid>

            {/* Activity */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Activity"
                {...register('activity')}
              />
            </Grid>
            {/* Reminder */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Reminder"
                {...register('reminder')}
              />
            </Grid>

            {/* Save and Cancel Buttons */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                Add Plan
              </Button>
              <Button variant="outlined" color="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

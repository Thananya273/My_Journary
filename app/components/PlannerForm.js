"use client";
import { useState } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function PlannerForm({ initialData = {}, date, onSave }) {
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
            {/* Display the date */}
            <Grid item xs={12}>
              <Typography variant="h6">Date: {date}</Typography>
            </Grid>

            {/* Place */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Place"
                {...register('place', { required: true })}
              />
            </Grid>

            {/* Time */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                {...register('time')}
              />
            </Grid>

            {/* Place Information */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Place Information"
                {...register('placeInfo')}
              />
            </Grid>

            {/* Activity */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Activity"
                {...register('activity')}
              />
            </Grid>

            {/* How to Go */}
            <Grid item xs={12}>
              <Select
                fullWidth
                value={howToGo}
                label="How to Go"
                onChange={(e) => setHowToGo(e.target.value)}
              >
                <MenuItem value="car">Car</MenuItem>
                <MenuItem value="walk">Walk</MenuItem>
                <MenuItem value="train">Train</MenuItem>
                <MenuItem value="plane">Plane</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </Grid>

            {/* Note for How to Go */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Note for How to Go"
                {...register('howToGoNote')}
              />
            </Grid>

            {/* Reminder */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Reminder</Typography>
                  <TextField
                    fullWidth
                    label="Reminder"
                    {...register('reminder')}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Checklist */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Checklist</Typography>
                  <TextField
                    fullWidth
                    label="Checklist"
                    {...register('checklist')}
                    placeholder="Enter tasks separated by commas"
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Save Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Plan
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

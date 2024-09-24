// components/TripForm.js
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export default function TripForm({ onSubmit, onCancel }) {
  const { register, handleSubmit, reset } = useForm();

  // Handle form submission
  function handleFormSubmit(data) {
    onSubmit(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="tripForm" style={{ marginTop: '2rem' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Create New Trip</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Trip Name"
            {...register("name", { required: true })}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Destination"
            {...register("destination", { required: true })}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            {...register("country", { required: true })}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            {...register("startDate", { required: true })}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="End Date"
            type="date"
            {...register("endDate", { required: true })}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Note"
            {...register("note")}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Budget"
            type="number"
            {...register("budget")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Status"
            {...register("status")}
            variant="outlined"
            multiline
            rows={2}
            placeholder="Enter statuses separated by commas"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type="submit" variant="contained" color="primary">
            Add Trip
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

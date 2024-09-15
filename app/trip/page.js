"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Grid, Card, CardContent, Typography, Button, TextField } from "@mui/material";
import Link from "next/link";

export default function Planner() {
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Fetch all trips
  async function fetchTrips() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip`);
    const t = await data.json();
    setTrips(t);
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  // Create a new trip
function createTrip(data) {
  fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      const result = await response.json();
      console.log(result); // Log the API response for debugging
      if (response.ok) {
        fetchTrips();
        reset(); // Reset form after submission
        setShowForm(false); // Hide form after submission
      } else {
        console.error("Failed to create trip:", result); // Log error if any
      }
    })
    .catch((error) => {
      console.error("Error while creating trip:", error); // Log network or other errors
    });
}

  return (
    <Container>
      {/* Create New Trip Form */}
      {showForm && (
        <form onSubmit={handleSubmit(createTrip)} id="tripForm" style={{ marginTop: '2rem' }}>
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
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Trip
            </Button>
          </Grid>
        </Grid>
      </form>
      
      )}

      {/* My Trips Section */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography variant="h4">My Trips</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm((prev) => !prev)} // Toggle form visibility
        >
          {showForm ? "- Close Form" : "+ Create New Trip"}
        </Button>
      </Grid>

      {/* Trip Cards */}
      <Grid container spacing={3}>
        {trips.map((trip) => (
          <Grid item xs={12} sm={6} md={4} key={trip._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{trip.name}</Typography>
                <Typography variant="subtitle1">{trip.destination}</Typography>
                <Typography variant="body2">
                  {new Date(trip.startDate).toLocaleDateString()} to {new Date(trip.endDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">Note: {trip.note.join(", ") || "No notes listed"}</Typography>
                <Link href={`/planner/trip/${trip._id}`} passHref>
                  <Button variant="outlined" sx={{ mt: 2 }}>View Trip</Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

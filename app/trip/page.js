"use client";
import { useState, useEffect } from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import DashboardLayout from '@/app/components/MyAppBar';
import TripForm from '@/app/components/TripForm';
import MyTrip from '@/app/components/MyTrip';

export default function Planner() {
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
  const createTrip = (data) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(async (response) => {
      const result = await response.json();
      if (response.ok) {
        setTrips(prevTrips => [...prevTrips, result]); // Add the new trip to the existing trips
        setShowForm(false); // Close form after trip creation
      } else {
        console.error("Failed to create trip:", result);
      }
    })
    .catch((error) => {
      console.error("Error while creating trip:", error);
    });
  };

  return (
    <DashboardLayout>
      <Container>
        <Typography variant="h4">My Trips</Typography>
        
        {/* Toggle Create New Trip Form */}
        {!showForm && (
          <Grid container justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowForm(true)} // Show the form
            >
              + Create New Trip
            </Button>
          </Grid>
        )}

        {/* Trip Form Section */}
        {showForm && (
          <TripForm
            onSubmit={createTrip}
            onCancel={() => setShowForm(false)} // Hide the form on cancel
          />
        )}

        {/* My Trips Section */}
        <MyTrip trips={trips} />
      </Container>
    </DashboardLayout>
  );
}

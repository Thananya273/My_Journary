"use client";
import { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Link from "next/link";
import DashboardLayout from '@/app/components/MyAppBar';
import TripForm from '@/app/components/TripForm';

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
        if (response.ok) {
          fetchTrips();
          setShowForm(false); // Close form after trip creation
        } else {
          console.error("Failed to create trip:", result);
        }
      })
      .catch((error) => {
        console.error("Error while creating trip:", error);
      });
  }

  return (
    <DashboardLayout>
      <Container>
      <Typography variant="h4">My Plans</Typography>
        {/* My Trips Section */}
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
                  <Typography variant="body2">Note: {trip.note?.join(", ") || "No notes listed"}</Typography>
                  <Link href={`/planner/${trip._id}`} passHref>
                    <Button variant="outlined" sx={{ mt: 2 }}>Add Planner</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </DashboardLayout>
  );
}

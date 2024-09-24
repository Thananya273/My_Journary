"use client";
import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import TripCard from '@/app/components/TripCard'; // Import TripCard component
import DashboardLayout from '@/app/components/MyAppBar'; // Import the layout component


export default function TripPage({ params }) {
  const { tripId } = params; // Get tripId from params
  const [trip, setTrip] = useState(null); // State to store trip data

  // Fetch the trip data based on tripId
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip/${tripId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Trip Data:", data);
        setTrip(data); // Set the trip data
      })
      .catch((error) => {
        console.error("Error fetching trip:", error);
      });
  }, [tripId]); // Re-fetch when tripId changes

  if (!trip) {
    // Display a message while loading or if trip data is unavailable
    return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>Loading trip data...</Typography>;
  }

  return (
    <DashboardLayout>
      <Container sx={{ mt: 4, mb: 4 }}>
        {/* Show Trip details with the TripCard component */}
        <Typography variant="h4" gutterBottom>{trip.name}</Typography>
        <TripCard trip={trip} /> {/* Display the trip details using the TripCard component */}
      </Container>
    </DashboardLayout>
  );
}

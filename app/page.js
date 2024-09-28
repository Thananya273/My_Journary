"use client";
import { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Divider } from "@mui/material";
import DashboardLayout from '@/app/components/MyAppBar';
import TripForm from '@/app/components/TripForm';
import MyTrip from '@/app/components/MyTrip';
import Loading from '@/app/components/Loading'; // Import the Loading component

export default function Trip() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [showForm, setShowForm] = useState(false);

  // Fetch all trips
  const fetchTrips = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip`);
      const data = await response.json();
      setTrips(data); // Set the fetched trips
    } catch (error) {
      console.error("Failed to fetch trips:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  useEffect(() => {
    fetchTrips(); // Fetch trips when the component mounts
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
          fetchTrips(); // Fetch updated trips
          setShowForm(false); // Close the form after saving
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
      <Typography variant="h2" gutterBottom color="#3C5B6F">My Trips</Typography>
        <Divider sx={{ my: 3 }} />

        {/* Loading State */}
        {loading ? (
          <Loading /> // Render the Loading component while data is being fetched
        ) : (
          <>
            {/* Toggle Create New Trip Form */}
            {!showForm && (
              <Grid container justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setShowForm(true)} // Show the form
                  sx={{ mb: 2, backgroundColor: '#EAD8B1', color: '#153448' }}
                >
                  + Create New Trip
                </Button>
              </Grid>
            )}

            {/* Trip Form Section */}
            {showForm && (
              <TripForm
                onSubmit={createTrip} // Handle trip creation
                onCancel={() => setShowForm(false)} // Hide the form on cancel
              />
            )}
            {/* My Trips Section */}
            <MyTrip trips={trips} /> {/* Pass trips directly */}
          </>
        )}
      </Container>
    </DashboardLayout>
  );
}

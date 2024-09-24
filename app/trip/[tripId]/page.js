"use client";
import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Divider, ButtonGroup, Button } from '@mui/material';
import TripCard from '@/app/components/TripCard'; // Import TripCard component
import PlannerCard from '@/app/components/PlannerCard'; // Import PlannerCard component
import DiaryCard from '@/app/components/DiaryCard'; // Import DiaryCard component
import DashboardLayout from '@/app/components/MyAppBar'; // Import the layout component

export default function TripPage({ params }) {
  const { tripId } = params; // Get tripId from params
  const [trip, setTrip] = useState(null); // State to store trip data
  const [planners, setPlanners] = useState([]); // State to store planner data
  const [diaries, setDiaries] = useState([]); // State to store diary data
  const [showPlanners, setShowPlanners] = useState(true); // State to toggle between planners and diaries

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

  // Fetch the planner data based on tripId
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/planner?tripId=${tripId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Planner Data:", data);
        setPlanners(data.filter(planner => planner.tripId === tripId)); // Filter planners for the current tripId
      })
      .catch((error) => {
        console.error("Error fetching planners:", error);
      });
  }, [tripId]); // Re-fetch when tripId changes

  // Fetch the diary data based on tripId (assumes there's an API endpoint for diaries)
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diary?tripId=${tripId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Diary Data:", data);
        setDiaries(data.filter(diary => diary.tripId === tripId)); // Filter diaries for the current tripId
      })
      .catch((error) => {
        console.error("Error fetching diaries:", error);
      });
  }, [tripId]); // Re-fetch when tripId changes

  // Helper function to format the date in Day Month Year format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Group planners by date
  const groupPlannersByDate = () => {
    const grouped = {};
    planners.forEach((planner) => {
      const date = new Date(planner.date).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(planner);
    });
    return grouped;
  };

  const plannersByDate = groupPlannersByDate();

  if (!trip) {
    // Display a message while loading or if trip data is unavailable
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        Loading trip data...
      </Typography>
    );
  }

  return (
    <DashboardLayout>
      <Container sx={{ mt: 4, mb: 4 }}>
        {/* Show Trip details with the TripCard component */}
        <Typography variant="h4" gutterBottom>
          {trip.name}
        </Typography>
        <TripCard trip={trip} /> {/* Display the trip details using the TripCard component */}

        {/* Button Group to toggle between planners and diaries */}
        <ButtonGroup variant="outlined" sx={{ mt: 2, mb: 2 }}>
          <Button onClick={() => setShowPlanners(true)} color={showPlanners ? 'primary' : 'default'}>
            Planners
          </Button>
          <Button onClick={() => setShowPlanners(false)} color={!showPlanners ? 'primary' : 'default'}>
            Diaries
          </Button>
        </ButtonGroup>

        {/* Display planners or diary entries based on toggle state */}
        {showPlanners ? (
          <div style={{ marginTop: '24px' }}>
            <Typography variant="h5" gutterBottom>
              Planners
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {Object.keys(plannersByDate).length > 0 ? (
              <Grid container spacing={2}>
                {Object.keys(plannersByDate).map((date) => (
                  <Grid item xs={12} key={date}>
                    <Typography variant="h6" gutterBottom>
                      Date: {formatDate(date)} {/* Show the date in Day Month Year format */}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {plannersByDate[date].map((planner) => (
                      <PlannerCard
                        key={planner._id}
                        planner={planner} // Pass the planner data to the PlannerCard component
                        showActions={false} // Assuming you want to hide edit/delete buttons here
                      />
                    ))}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                No plans for this trip yet.
              </Typography>
            )}
          </div>
        ) : (
          <div style={{ marginTop: '24px' }}>
            <Typography variant="h5" gutterBottom>
              Diaries
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {diaries.length > 0 ? (
              <Grid container spacing={2}>
                {diaries.map((diary) => (
                  <Grid item xs={12} key={diary._id}>
                    <DiaryCard diary={diary}
                    showActions={false} /> {/* Pass diary data to the DiaryCard component */}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                No diaries for this trip yet.
              </Typography>
            )}
          </div>
        )}
      </Container>
    </DashboardLayout>
  );
}

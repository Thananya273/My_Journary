"use client";
import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Divider, ButtonGroup, Button, Box } from '@mui/material';
import Slider from 'react-slick'; // Import Slider from react-slick
import TripCard from '@/app/components/TripCard'; // Import TripCard component
import PlannerCard from '@/app/components/PlannerCard'; // Import PlannerCard component
import DiaryCard from '@/app/components/DiaryCard'; // Import DiaryCard component
import DashboardLayout from '@/app/components/MyAppBar'; // Import the layout component
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import Link from "next/link";
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

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
        const filteredPlanners = data.filter(planner => planner.tripId === tripId);
        // Sort planners by date and time
        filteredPlanners.sort((a, b) => new Date(a.date) - new Date(b.date));
        setPlanners(filteredPlanners); // Set sorted planner data
      })
      .catch((error) => {
        console.error("Error fetching planners:", error);
      });
  }, [tripId]); // Re-fetch when tripId changes

  // Fetch the diary data based on tripId
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
      const date = new Date(planner.date).toDateString(); // Get only the date part
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
      <DashboardLayout>
        {/* Add a loading state or a message here if needed */}
      </DashboardLayout>
    );
  }

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 cards at a time
    slidesToScroll: 1,
  };

  return (
    <DashboardLayout>
      <Container sx={{ mt: 4, mb: 4 }}>
        {/* Show Trip details with the TripCard component */}
        <Typography variant="h4" gutterBottom>
          {trip.name}
        </Typography>
        <TripCard trip={trip} />

        {/* Button Group to toggle between planners and diaries */}
        <Grid container justifyContent="center" sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={12} md={6}>
            <ButtonGroup fullWidth sx={{ mt: 2, mb: 2 }}>
              <Button 
                onClick={() => setShowPlanners(true)} 
                sx={{ 
                  flex: 1, 
                  backgroundColor: showPlanners ? '#3C5B6F' : '#ffffff', 
                  color: showPlanners ? 'white' : '#3C5B6F', 
                  '&:hover': {
                    backgroundColor: showPlanners ? '#2C434D' : '#3C5B6F',
                  },
                }}
              >
                Planners
              </Button>
              <Button 
                onClick={() => setShowPlanners(false)} 
                sx={{ 
                  flex: 1, 
                  backgroundColor: !showPlanners ? '#3C5B6F' : '#ffffff', 
                  color: !showPlanners ? 'white' : '#3C5B6F',
                  '&:hover': {
                    backgroundColor: !showPlanners ? '#2C434D' : '#3C5B6F',
                  },
                }}
              >
                Diaries
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        {/* Display planners or diary entries based on toggle state */}
        {showPlanners ? (
          <div style={{ marginTop: '24px' }}>
            <Link href={`/planner/${trip._id}`} passHref>
              <Typography variant="h5" gutterBottom sx={{ color: '#3C5B6F', display: 'inline-flex', alignItems: 'center' }}>
                Planner <KeyboardDoubleArrowRightOutlinedIcon /><span style={{ marginLeft: '8px' }}></span>
              </Typography>
            </Link>
            <Divider sx={{ mb: 2 }} />
            {Object.keys(plannersByDate).length > 0 ? (
              <Grid container spacing={2}>
                {Object.keys(plannersByDate).map((date) => (
                  <Grid item xs={12} key={date}>
                    <Typography variant="h6" gutterBottom>
                      Date: {formatDate(date)}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {plannersByDate[date].map((planner) => (
                      <PlannerCard
                        key={planner._id}
                        planner={planner}
                        showActions={false}
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
          <div>
            <Link href={`/diary/${trip._id}`} passHref>
              <Typography variant="h5" gutterBottom sx={{ color: '#3C5B6F', display: 'inline-flex', alignItems: 'center' }}>
                Diary <KeyboardDoubleArrowRightOutlinedIcon /> <span style={{ marginLeft: '8px' }}></span>
              </Typography>
            </Link>
            <Divider sx={{ mb: 2 }} />
            {diaries.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                  No diary entries found.
                </Typography>
              </Grid>
            ) : diaries.length === 1 ? (
              <Box sx={{ backgroundColor: '#3C5B6F', p: 2, borderRadius: '8px' }}>
                <Grid container justifyContent="flex-start" alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <DiaryCard
                      diary={diaries[0]}
                      showActions={false}
                    />
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box sx={{ backgroundColor: '#3C5B6F', p: 2, borderRadius: '8px' }}>
                <Slider {...sliderSettings}>
                  {diaries.map(diary => (
                    <div key={diary._id}>
                      <DiaryCard
                        diary={diary}
                        showActions={false}
                      />
                    </div>
                  ))}
                </Slider>
              </Box>
            )}
          </div>
        )}
      </Container>
    </DashboardLayout>
  );
}

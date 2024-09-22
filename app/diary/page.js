"use client";
import { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";

export default function Diary() {
  const [trips, setTrips] = useState([]);

  // Fetch all trips
  async function fetchTrips() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip`);
    const t = await data.json();
    setTrips(t);
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <Container>
      {/* My Diary Section */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography variant="h4">My Diary</Typography>
      </Grid>

      {/* Trip Cards */}
      <Grid container spacing={3}>
        {trips.map((trip) => (
          <Grid item xs={12} sm={6} md={4} key={trip._id}>
              <CardContent 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  textAlign: 'center', 
                  height: 200 // Adjust card height to give more space for the icon
                }}
              >
                {/* Large Mail Icon styled like a cute sticker */}
                <Link href={`/diary/${trip._id}`} passHref>
                  <IconButton sx={{ p: 0 }}>
                    <Box
                      sx={{
                        backgroundColor: '#003944', // Light pink background
                        borderRadius: '50%', // Circle shape
                        padding: 2,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for 3D effect
                        '&:hover': {
                          transform: 'scale(1.1)', // Slightly enlarges on hover
                          transition: '0.3s ease-in-out',
                        },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MailIcon sx={{ fontSize: 100, color: '#ffffff' }} /> {/* Playful pink color */}
                    </Box>
                  </IconButton>
                </Link>

                {/* Trip Name */}
                <Typography variant="h6" sx={{ mt: 2 }}>{trip.name}</Typography>
              </CardContent>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

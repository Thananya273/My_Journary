"use client";
import { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, IconButton, Box, Divider } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import DashboardLayout from '@/app/components/MyAppBar';

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
    <DashboardLayout>
      <Container>
        {/* My Diary Section */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
          <Typography variant="h2" align="center" gutterBottom color="#3C5B6F">My Diary</Typography>
        </Grid>
        <Divider sx={{ my: 3 }} />

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
                          backgroundColor: '#153448',
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
                        <MailIcon sx={{ fontSize: 100, color: '#ebddc7' }} />
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
      </DashboardLayout>
  );
}

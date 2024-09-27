"use client";
import { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Box, Divider } from "@mui/material";
import Link from "next/link";
import DashboardLayout from '@/app/components/MyAppBar';

export default function Planner() {
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
        <Typography variant="h2" align="center" gutterBottom color="#3C5B6F">
          My Plans
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ backgroundColor: '#fcfbf2', p: 4, borderRadius: '8px' }}>
          <Grid container spacing={3}>
            {trips.map((trip) => (
              <Grid item xs={12} sm={6} md={4} key={trip._id}>
                <Link href={`/planner/${trip._id}`} passHref>
                  <Card 
                    sx={{ 
                      backgroundColor: '#3C5B6F', 
                      color: '#DFD0B8',
                      height: '300px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      textAlign: 'center', 
                      cursor: 'pointer', 
                      boxShadow: 3,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {trip.name}
                      </Typography>
                      <Divider sx={{ my: 1, backgroundColor: '#fcfbf2' }} />
                      <Typography variant="subtitle1">
                        {trip.destination}, {trip.country}
                      </Typography>
                      <Typography variant="body2">
                        {new Date(trip.startDate).toLocaleDateString('en-GB')} - {new Date(trip.endDate).toLocaleDateString('en-GB')}
                      </Typography>
                      <Typography variant="body2">
                        Budget: {trip.budget ? `${trip.budget} THB` : 'Not Specified'}
                      </Typography>
                      <Typography variant="body2">
                        Note: {trip.note || "No notes available"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </DashboardLayout>
  );
}

"use client";
import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import TripCard from '@/app/components/TripCard';
import PlannerForm from '@/app/components/PlannerForm';

export default function PlannerPage({ params }) {
  const { tripId } = params;
  const [trip, setTrip] = useState(null);
  const [planners, setPlanners] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip/${tripId}`)
      .then(res => res.json())
      .then(data => setTrip(data));
    
    fetchPlanners();
  }, [tripId]);

  const fetchPlanners = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/planner?tripId=${tripId}`)
      .then(res => res.json())
      .then(data => setPlanners(data));
  };

  const handleSavePlan = (plan) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/planner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...plan, tripId }),
    }).then(() => fetchPlanners());
  };

  if (!trip) return <p>Loading...</p>;

  // Calculate the number of days in the trip
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  const numDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1; // inclusive of start and end day

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* Trip Details */}
      <Typography variant="h4" gutterBottom>{trip.name}</Typography>
      {trip && <TripCard trip={trip} />}

      {/* Planner for each day */}
      {Array.from({ length: numDays }).map((_, index) => {
        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + index);

        return (
          <PlannerForm
            key={index}
            day={index + 1}
            onSave={handleSavePlan}
          />
        );
      })}
    </Container>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import PlannerForm from '@/app/components/PlannerForm';
import TripCard from '@/app/components/TripCard';
import CustomCalendar from '@/app/components/Calendar';

export default function PlannerPage({ params }) {
  const { tripId } = params;
  const [trip, setTrip] = useState(null);
  const [planners, setPlanners] = useState([]);

  // Fetch trip details and planner data when the component mounts
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip/${tripId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Trip Data:", data); // Log trip data
        setTrip(data);
      });
    
    fetchPlanners();
  }, [tripId]);

  // Fetch planners for this trip
  const fetchPlanners = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/planner?tripId=${tripId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Planners:", data); // Log planners
        setPlanners(data);
      });
  };

  // Handle save event from PlannerForm
  const handleSavePlanner = (plannerData) => {
    console.log("Saving Planner Data:", plannerData); // Log data
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/planner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...plannerData, tripId }),
    })
    .then(res => res.json())
    .then(newPlanner => {
      setPlanners(prevPlanners => [...prevPlanners, newPlanner]); // Append new plan
    });
  };

  // Calculate the number of days for the trip
  const calculateDays = () => {
    if (!trip) return 0;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;  // Calculate total days
  };

  const totalDays = calculateDays();

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* Trip Details */}
      {trip && (
        <>
          <Typography variant="h4" gutterBottom>{trip.name}</Typography>
          <TripCard trip={trip} />
          <CustomCalendar startDate={trip.startDate} endDate={trip.endDate} />
        </>
      )}

      {/* Planner Forms */}
      <Typography variant="h5" sx={{ mt: 4 }}>Daily Plans</Typography>
      {trip && Array.from({ length: totalDays }, (_, index) => {
        const dayNumber = index + 1;
        const savedPlanner = planners.find(planner => planner.day === dayNumber);

        console.log(`Day ${dayNumber}:`, savedPlanner); // Log saved planner data

        return (
          <div key={index}>
            <PlannerForm
              day={dayNumber}
              initialData={savedPlanner}
              onSave={handleSavePlanner}
            />
          </div>
        );
      })}
    </Container>
  );
}

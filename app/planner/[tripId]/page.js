"use client";
import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Select, MenuItem, FormControl } from '@mui/material';
import PlannerForm from '@/app/components/PlannerForm';
import TripCard from '@/app/components/TripCard';
import CustomCalendar from '@/app/components/Calendar';
import PlannerCard from '@/app/components/PlannerCard';

export default function PlannerPage({ params }) {
  const { tripId } = params;
  const [trip, setTrip] = useState(null);
  const [planners, setPlanners] = useState([]);
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip/${tripId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Trip Data:", data);
        setTrip(data);
      });

    fetchPlanners();
  }, [tripId]);

  const fetchPlanners = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/planner?tripId=${tripId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Planners:", data);
        setPlanners(data);
      });
  };

  const handleSavePlanner = (plannerData) => {
    if (!trip) return; // Make sure trip data is available
  
    const tripStartDate = new Date(trip.startDate);
    const selectedDate = new Date(tripStartDate);
    selectedDate.setDate(tripStartDate.getDate() + selectedDay - 1);
    
    const dateString = selectedDate.toISOString(); // Convert selected date to ISO string
  
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/planner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...plannerData, tripId, date: dateString }), // Use the calculated date
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(newPlanner => {
      setPlanners(prevPlanners => [...prevPlanners, newPlanner]);
    })
    .catch(error => {
      console.error("Error saving planner:", error);
    });
  };

  const totalDays = () => {
    if (!trip) return 0;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const savedPlannersForDay = trip ? planners.filter(planner => {
    const plannerDate = new Date(planner.date);
    const tripStartDate = new Date(trip.startDate);
    const tripDay = new Date(tripStartDate);
    tripDay.setDate(tripDay.getDate() + selectedDay - 1);
  
    return (
      planner.tripId === tripId &&
      plannerDate.toDateString() === tripDay.toDateString()
    );
  }) : [];
  
  const handleDeletePlanner = (plannerId) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/planner/${plannerId}`, {
      method: "DELETE",
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      // Remove the deleted planner from the state
      setPlanners(prevPlanners => prevPlanners.filter(planner => planner._id !== plannerId));
    })
    .catch(error => {
      console.error("Error deleting planner:", error);
    });
  };

  console.log("Saved Planners for Day:", savedPlannersForDay);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {trip && (
        <>
          <Typography variant="h4" gutterBottom>{trip.name}</Typography>
          <TripCard trip={trip} />
          <CustomCalendar startDate={trip.startDate} endDate={trip.endDate} />
        </>
      )}

      <FormControl fullWidth sx={{ mt: 4 }}>
        <Select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {Array.from({ length: totalDays() }, (_, index) => (
            <MenuItem key={index} value={index + 1}>
              Day {index + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h5" sx={{ mt: 4 }}>Daily Plan for Day {selectedDay}</Typography>
      <PlannerForm
        initialData={savedPlannersForDay[0] || {}}
        onSave={handleSavePlanner}
      />

      <Typography variant="h6" sx={{ mt: 4 }}>Saved Plans:</Typography>
      <Grid container spacing={2}>
        {savedPlannersForDay.length > 0 ? (
          savedPlannersForDay.map(planner => (
            <Grid item xs={12} sm={6} md={4} key={planner._id}>
              <PlannerCard planner={planner} onDelete={handleDeletePlanner}/>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No plans for this day.</Typography>
        )}
      </Grid>
    </Container>
  );
}

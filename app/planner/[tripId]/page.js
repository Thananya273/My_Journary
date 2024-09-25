"use client";
import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Select, MenuItem, FormControl, Divider, Button, Chip, ButtonGroup } from '@mui/material';
import PlannerForm from '@/app/components/PlannerForm';
import TripCard from '@/app/components/TripCard';
import CustomCalendar from '@/app/components/Calendar';
import PlannerCard from '@/app/components/PlannerCard';
import PlannerUpdate from '@/app/components/PlannerUpdate';
import DashboardLayout from '@/app/components/MyAppBar';

export default function PlannerPage({ params }) {
  const { tripId } = params;
  const [trip, setTrip] = useState(null);
  const [planners, setPlanners] = useState([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlanner, setCurrentPlanner] = useState(null);

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
    if (!trip) return;

    const tripStartDate = new Date(trip.startDate);
    const selectedDate = new Date(tripStartDate);
    selectedDate.setDate(tripStartDate.getDate() + selectedDay - 1);

    const dateString = selectedDate.toISOString();

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/planner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...plannerData, tripId, date: dateString }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(newPlanner => {
      setPlanners(prevPlanners => [...prevPlanners, newPlanner]);
      setShowForm(false);
    })
    .catch(error => {
      console.error("Error saving planner:", error);
    });
  };

  const handleEditPlanner = (planner) => {
    setCurrentPlanner(planner);
    setShowForm(false);
    setIsEditing(true);
  };

  const handleUpdatePlanner = (updatedPlanner) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/planner/${updatedPlanner._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPlanner),
    })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(updated => {
      setPlanners(prevPlanners => 
        prevPlanners.map(planner => (planner._id === updated._id ? updated : planner))
      );
      setIsEditing(false);
      setCurrentPlanner(null);
    })
    .catch(error => console.error("Error updating planner:", error));
  };

  const handleDeletePlanner = (plannerId) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/planner/${plannerId}`, {
      method: "DELETE",
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      setPlanners(prevPlanners => prevPlanners.filter(planner => planner._id !== plannerId));
    })
    .catch(error => {
      console.error("Error deleting planner:", error);
    });
  };

  const totalDays = () => {
    if (!trip) return 0;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const getDateForSelectedDay = () => {
    if (!trip) return "";
    const tripStartDate = new Date(trip.startDate);
    const selectedDate = new Date(tripStartDate);
    selectedDate.setDate(tripStartDate.getDate() + selectedDay - 1);

    return selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
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

  const sortedPlanners = savedPlannersForDay.sort((a, b) => {
    return new Date(`1970-01-01T${a.time}:00`) - new Date(`1970-01-01T${b.time}:00`);
  });

  return (
    <DashboardLayout>
    <Container sx={{ mt: 4, mb: 4 }}>
      {trip && (
        <>
          <Typography variant="h4" gutterBottom>{trip.name}</Typography>
          <TripCard trip={trip} />
          <CustomCalendar startDate={trip.startDate} endDate={trip.endDate} />
        </>
      )}

      {/* Flex container for day buttons and ADD Plan button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
        {/* Button group for selecting days */}
        <ButtonGroup variant="outlined">
          {Array.from({ length: totalDays() }, (_, index) => (
            <Button 
              key={index} 
              variant={selectedDay === index + 1 ? 'contained' : 'outlined'} 
              color={selectedDay === index + 1 ? 'primary' : 'default'}
              onClick={() => setSelectedDay(index + 1)}
            >
              Day {index + 1}
            </Button>
          ))}
        </ButtonGroup>

        {/* ADD Plan button */}
        {!showForm && (
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }} // Add margin-left for spacing
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
            }}
          >
            + ADD Plan
          </Button>
        )}
      </div>

      {showForm && !isEditing && (
        <PlannerForm 
          onSave={handleSavePlanner} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      {isEditing && currentPlanner && (
        <PlannerUpdate 
          planner={currentPlanner} 
          onSave={handleUpdatePlanner} 
          onCancel={() => { setIsEditing(false); setCurrentPlanner(null); }} 
        />
      )}

      <Typography variant="h5" sx={{ mt: 4 }}>
        Date: {getDateForSelectedDay()}
      </Typography>
      <Divider sx={{ my: 3 }} />
      {sortedPlanners.length > 0 ? (
        sortedPlanners.map(planner => (
          <Grid item xs={12} sm={6} md={4} key={planner._id}>
            <PlannerCard 
              planner={planner} 
              onDelete={handleDeletePlanner} 
              onEdit={handleEditPlanner} 
              showActions={true}
              showEdit={true}
            />
          </Grid>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>No plans for this day.</Typography>
      )}
    </Container>
  </DashboardLayout>
  );
}

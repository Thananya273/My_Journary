"use client";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import Link from "next/link";
import TripUpdate from '@/app/components/TripUpdate'; // Import the TripUpdate component
import { useState, useEffect } from "react";

export default function MyTrip() {
  const [trips, setTrips] = useState([]); // State to hold all trips
  const [selectedTrip, setSelectedTrip] = useState(null); // State to track the trip to be edited
  const [isEditing, setIsEditing] = useState(false); // State to toggle the edit form

  // Fetch trips from the server
  const fetchTrips = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip`);
    const data = await response.json();
    setTrips(data);
  };

  useEffect(() => {
    fetchTrips(); // Fetch trips on component mount
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip/${id}`, {
      method: "DELETE",
    });
    
    if (response.ok) {
      console.log(`Trip with ID ${id} deleted`);
      setTrips(trips.filter(trip => trip._id !== id)); // Remove the deleted trip from state
    } else {
      console.error("Failed to delete trip");
    }
  };

  const handleEdit = (trip) => {
    setSelectedTrip(trip);
    setIsEditing(true); // Show the edit form
  };

  const handleSave = async (updatedTrip) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip/${updatedTrip._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTrip),
    });

    if (response.ok) {
      console.log("Trip updated successfully");
      setTrips(prevTrips => prevTrips.map(trip => trip._id === updatedTrip._id ? updatedTrip : trip)); // Update the trip in state
      setIsEditing(false); // Hide the edit form
      setSelectedTrip(null); // Clear the selected trip
    } else {
      console.error("Failed to update trip");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Hide the edit form
    setSelectedTrip(null); // Clear the selected trip
  };

  return (
    <div>
      {isEditing ? (
        <TripUpdate 
          trip={selectedTrip} 
          onSave={handleSave} 
          onCancel={handleCancelEdit} 
        />
      ) : (
        <Grid container spacing={3}>
          {trips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} key={trip._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{trip.name}</Typography>
                  <Typography variant="subtitle1">{trip.destination}</Typography>
                  <Typography variant="body2">
                    {new Date(trip.startDate).toLocaleDateString()} to {new Date(trip.endDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">Note: {trip.note || "No notes listed"}</Typography>
                  <Link href={`/trip/${trip._id}`} passHref>
                    <Button variant="outlined" sx={{ mt: 2 }}>View Trip</Button>
                  </Link>
                  <Button variant="outlined" color="secondary" onClick={() => handleEdit(trip)} sx={{ mt: 2, ml: 1 }}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(trip._id)} sx={{ mt: 2, ml: 1 }}>Delete</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

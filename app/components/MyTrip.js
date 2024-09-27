"use client";
import { Grid, Card, CardContent, CardMedia, Typography, Button, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import Link from "next/link";
import TripUpdate from '@/app/components/TripUpdate'; // Import the TripUpdate component
import { useState, useEffect } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Import MoreVert icon
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon

export default function MyTrip() {
  const [trips, setTrips] = useState([]); // State to hold all trips
  const [selectedTrip, setSelectedTrip] = useState(null); // State to track the trip to be edited
  const [isEditing, setIsEditing] = useState(false); // State to toggle the edit form
  const [anchorEls, setAnchorEls] = useState({}); // State to manage menu anchors for each trip

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

  const handleMenuClick = (event, tripId) => {
    setAnchorEls((prev) => ({
      ...prev,
      [tripId]: event.currentTarget, // Set the anchor for the specific trip
    }));
  };

  const handleCloseMenu = (tripId) => {
    setAnchorEls((prev) => ({
      ...prev,
      [tripId]: null, // Close the menu for the specific trip
    }));
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
            <Grid item xs={12} sm={6} md={6} key={trip._id}> {/* Adjusted to show 2 cards per row */}
              <Card sx={{ backgroundColor: '#fcfbf2', height: '100%', display: 'flex', flexDirection: 'column' }}> {/* Set card to flex column */}
                <CardMedia
                  component="img"
                  height="140"
                  image={trip.picture}
                  alt={`Cover for ${trip.name || 'Trip'}`}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}> {/* Allow content to grow and flex column */}
                  <Typography variant="h4">{trip.name}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">{trip.destination}, {trip.country}</Typography>
                  <Typography variant="body1">
                    {new Date(trip.startDate).toLocaleDateString('en-GB')} - {new Date(trip.endDate).toLocaleDateString('en-GB')}
                  </Typography>
                  <Typography variant="body1">Budget: {trip.budget ? `${trip.budget} THB` : '-'}</Typography>
                  <Typography variant="body1">Note: {trip.note != '' ? trip.note : "No notes"}</Typography>
                </CardContent>

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '16px' }}> {/* Align items to the right */}
                  <Link href={`/trip/${trip._id}`} passHref>
                  <Button
                    variant="outlined"
                    sx={{
                      marginRight: 1,
                      color: '#3C5B6F', // Text color
                      borderColor: '#3C5B6F', // Border color
                      '&:hover': {
                        backgroundColor: '#e0f0f5', // Optional: Light background on hover
                      },
                    }}
                  >
                    View Trip
                  </Button>
                  </Link>

                  {/* Three dots icon for menu */}
                  <IconButton onClick={(event) => handleMenuClick(event, trip._id)}>
                    <MoreVertIcon />
                  </IconButton>
                </div>

                {/* Menu for Edit and Delete */}
                <Menu
                  anchorEl={anchorEls[trip._id]} // Use the specific anchor for this trip
                  open={Boolean(anchorEls[trip._id])}
                  onClose={() => handleCloseMenu(trip._id)} // Close the menu for this trip
                  sx={{ "& .MuiMenu-paper": { borderRadius: "8px", marginTop: "20px" } }} // Styling the menu
                >
                  <MenuItem onClick={() => { handleEdit(trip); handleCloseMenu(trip._id); }} sx={{ display: 'flex', alignItems: 'center' }}>
                    <EditIcon sx={{ mr: 1 }} /> Edit
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => { handleDelete(trip._id); handleCloseMenu(trip._id); }} sx={{ display: 'flex', alignItems: 'center' }}>
                    <DeleteIcon sx={{ mr: 1 }} color="error" /> Delete
                  </MenuItem>
                </Menu>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

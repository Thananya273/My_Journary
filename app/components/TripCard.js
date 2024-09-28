import React from 'react';
import { Card, CardContent, Grid, Typography, Divider, CardMedia, Box } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const TripCard = ({ trip }) => {
  return (
    <Card sx={{ backgroundColor: '#335063', p: 2, borderRadius: '50px' }}>
      <CardContent>
        <Grid container spacing={3}>
          {/* Picture with a ring */}
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <Box
              sx={{
                border: '5px solid #DFD0B8', // Ring color and thickness
                borderRadius: '50%', // Make it circular
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '200px', // Increased total width including the ring
                height: '200px', // Increased total height including the ring
              }}
            >
              <CardMedia
                component="img"
                height="160" // Increased height for the image
                image={trip.picture} // URL for the trip picture
                alt="Trip Image"
                sx={{
                  width: '160px', // Increased width for uniform size
                  height: '160px', // Increased height for uniform size
                  borderRadius: '50%', // Make it circular
                  objectFit: 'cover', // Maintain aspect ratio and cover
                }}
              />
            </Box>
          </Grid>

          {/* Trip Details */}
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              {/* Destination and Country */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ color: '#DFD0B8' }}>
                  <PlaceIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#DFD0B8' }} /> Destination
                </Typography>
                <Typography variant="body1" sx={{ color: '#DFD0B8' }}>
                  {trip.destination}, {trip.country}
                </Typography>
              </Grid>

              {/* Dates */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ color: '#DFD0B8' }}>
                  <EventIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#DFD0B8' }} /> Dates
                </Typography>
                <Typography variant="body1" sx={{ color: '#DFD0B8' }}>
                  {new Date(trip.startDate).toLocaleDateString('en-GB')} - {new Date(trip.endDate).toLocaleDateString('en-GB')}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {/* Budget */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ color: '#DFD0B8' }}>
                  <AttachMoneyIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#DFD0B8' }} /> Budget
                </Typography>
                <Typography variant="body1" sx={{ color: '#DFD0B8' }}>
                  {trip.budget ? `${trip.budget} THB` : "No budget defined"}
                </Typography>
              </Grid>

              {/* Status */}
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom sx={{ color: '#DFD0B8' }}>
                  <InfoIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#DFD0B8' }} /> Notes
                </Typography>
                {trip.note && trip.note.length > 0 ? (
                  <ul>
                    {trip.note.map((note, index) => (
                      <li key={index}>
                        <Typography variant="body1" sx={{ color: '#DFD0B8' }}>{note}</Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2" color="textSecondary">No notes available.</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TripCard;

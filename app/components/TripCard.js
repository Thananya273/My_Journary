import React from 'react';
import { Card, CardContent, Grid, Typography, Divider } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const TripCard = ({ trip }) => {
  return (
    <Card sx={{ backgroundColor: '#f9f9f9', p: 2 }}>
      <CardContent>
        <Grid container spacing={3}>
          {/* Destination and Country */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              <PlaceIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Destination
            </Typography>
            <Typography variant="body1">{trip.destination}, {trip.country}</Typography>
          </Grid>

          {/* Dates */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              <EventIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Dates
            </Typography>
            <Typography variant="body1">
              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
            </Typography>
          </Grid>

          <Divider sx={{ my: 2, width: '100%' }} />

          {/* Budget */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              <AttachMoneyIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Budget
            </Typography>
            <Typography variant="body1">
              {trip.budget ? `${trip.budget} USD` : "No budget defined"}
            </Typography>
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Status
            </Typography>
            {trip.status && trip.status.length > 0 ? (
              <ul>
                {trip.status.map((status, index) => (
                  <li key={index}>
                    <Typography variant="body1">{status}</Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body2" color="textSecondary">No status updates available.</Typography>
            )}
          </Grid>
          <Divider sx={{ my: 2, width: '100%' }} />

          {/* Notes */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Notes
            </Typography>
            {trip.note && trip.note.length > 0 ? (
              <ul>
                {trip.note.map((note, index) => (
                  <li key={index}>
                    <Typography variant="body1">{note}</Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body2" color="textSecondary">No notes available.</Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TripCard;

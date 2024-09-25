import { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Divider, Grid, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MapIcon from '@mui/icons-material/Map';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function PlannerCard({ planner, onDelete, onEdit, showActions, showEdit }) {
  const [showMap, setShowMap] = useState(false); // State to toggle map visibility
  const [isEditing, setIsEditing] = useState(false); // State to track if editing is active

  const handleDelete = () => {
    onDelete(planner._id);
  };

  const handleEdit = () => {
    onEdit(planner);
  };

  const handleMapClick = () => {
    setShowMap(!showMap); // Toggle the map visibility on click
    setIsEditing(false); // Close edit mode when showing the map
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle editing mode
    setShowMap(false); // Close map mode when entering edit mode
  };

  // Ensure this is the correct embed URL from Google Maps
  const googleMapEmbedUrl = planner.GoogleMap 
    ? planner.GoogleMap // Ensure this holds the embed link
    : '';

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {/* Left side: Place and Time card */}
      <Grid item xs={12} sm={4}>
        <Card sx={{ boxShadow: 3, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {planner.place}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h4" color="text.secondary">{planner.time}</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Right side: Additional planner information or Google Map */}
      <Grid item xs={12} sm={8}>
        {showMap ? (
          <Card sx={{ boxShadow: 3, borderRadius: 2, height: '100%' }}>
            <CardContent>
              <iframe
                src={googleMapEmbedUrl}
                width="100%"
                height="300" // Adjust height as needed
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
              <div style={{ display: 'flex', marginTop: 2 }}>
  `           <Button variant="outlined" color="primary" onClick={handleMapClick} sx={{ marginTop: 2 }}>
              <ArrowBackIosIcon />Back
              </Button>
            </div>
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ boxShadow: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <CardContent>
              {/* Top Bar with Edit button and Map button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {/* Conditionally render MapIcon if GoogleMap is not empty */}
                {planner.GoogleMap && (
                  <IconButton color="primary" onClick={handleMapClick} sx={{ marginLeft: 1 }}>
                    <MapIcon />
                  </IconButton>
                )}
                {showEdit && ( // Conditionally render the Edit button
                  <IconButton color="primary" onClick={handleEditClick} sx={{ marginLeft: 1 }}>
                    <EditLocationAltIcon />
                  </IconButton>
                )}
              </div>

              {/* Place Info moved out of the table with padding */}
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#123E4C', marginTop: 2, padding: '0 16px' }}>
                Place Information:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ padding: '0 16px' }}>
                {planner.placeInfo}
              </Typography>

              {/* Table for Activity and Reminder */}
              <TableContainer sx={{ marginTop: 2 }}>
                <Table>
                  <TableBody>
                    {/* Activity Rows */}
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: '#123E4C' }}>Activity:</TableCell>
                      <TableCell>
                        {planner.activity.split('\n').map((activityItem, index) => (
                          <Typography key={index} variant="body2" color="text.secondary">
                            {activityItem.trim()}
                          </Typography>
                        ))}
                      </TableCell>
                    </TableRow>

                    {/* Reminder Row */}
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: '#123E4C' }}>Reminder:</TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">{planner.reminder}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
              {/* Conditional rendering for buttons */}
              {isEditing && showActions && ( // Check if editing mode and actions should be shown
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                  <Button color="primary" onClick={handleEdit} startIcon={<EditIcon />}>
                    Edit
                  </Button>
                  <Button color="error" onClick={handleDelete} startIcon={<DeleteIcon />} sx={{ marginLeft: 2 }}>
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}

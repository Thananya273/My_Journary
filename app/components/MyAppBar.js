import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, CssBaseline, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BookIcon from '@mui/icons-material/Book';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Loading from './Loading'; // Import the Loading component

const drawerWidth = 240;

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);
  const [dataLoading, setDataLoading] = useState(true); // Loading state for data

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true); // Set loading true before fetching
      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 200)); // 2 seconds
      setDataLoading(false); // Data loading complete
    };

    fetchData();
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#153448' }}>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            sx={{ 
              mr: 2, 
              color: '#EAD8B1' // Apply the color here
            }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              color: '#EAD8B1' // Apply the color here
            }}
          >
            MY JOURNARY
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#DFD0B8', 
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Planner Menu
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItemButton component="div" onClick={() => window.location.href = '/trip'} sx={{ px: 2 }}>
            <ListItemIcon>
              <TravelExploreIcon sx={{ color: '#153448' }} />
            </ListItemIcon>
            {open && <ListItemText 
              primary="Trips" 
              primaryTypographyProps={{ sx: { color: '#153448' } }} // Match icon color
            />}
          </ListItemButton>

          <ListItemButton component="div" onClick={() => window.location.href = '/planner'} sx={{ px: 2 }}>
            <ListItemIcon>
              <SummarizeIcon sx={{ color: '#153448' }} />
            </ListItemIcon>
            {open && <ListItemText 
              primary="Planner" 
              primaryTypographyProps={{ sx: { color: '#153448' } }} // Match icon color
            />}
          </ListItemButton>

          <ListItemButton component="div" onClick={() => window.location.href = '/diary'} sx={{ px: 2 }}>
            <ListItemIcon>
              <BookIcon sx={{ color: '#153448' }} />
            </ListItemIcon>
            {open && <ListItemText 
              primary="Diary" 
              primaryTypographyProps={{ sx: { color: '#153448' } }} // Match icon color
            />}
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin 0.3s',
          marginRight: !open ? `${drawerWidth}px` : '0', // Adjust margin based on drawer state
        }}
      >
        <Toolbar />
        {dataLoading ? <Loading /> : children} {/* Show loading only for data */}
      </Box>
    </Box>
  );
}

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box, CssBaseline, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
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
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            My Travel Planner
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
          <ListItem component="div" onClick={() => window.location.href = '/trip'}>
            <TravelExploreIcon sx={{ mr: 2 }} />
            {open && <ListItemText primary="Trips" />}
          </ListItem>
          <ListItem component="div" onClick={() => window.location.href = '/planner'}>
            <SummarizeIcon sx={{ mr: 2 }} />
            {open && <ListItemText primary="Planner" />}
          </ListItem>
          <ListItem component="div" onClick={() => window.location.href = '/diary'}>
            <BookIcon sx={{ mr: 2 }} />
            {open && <ListItemText primary="Diary" />}
          </ListItem>
        </List>

      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {dataLoading ? <Loading /> : children} {/* Show loading only for data */}
      </Box>
    </Box>
  );
}

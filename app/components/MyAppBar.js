import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box, CssBaseline, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BookIcon from '@mui/icons-material/Book';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const drawerWidth = 240;

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true); // Set to true to keep the drawer open

  // Toggle the drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar with a Menu Button and Title */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1976d2' }}>
        <Toolbar>
          {/* Close Icon for closing the Drawer */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
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
        {/* Optional: Add Logo or Branding */}
        <Toolbar>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Planner Menu
          </Typography>
        </Toolbar>
        <Divider />

        {/* Navigation Links */}
        <List>
          <ListItem button component="a" href="/">
            <HomeIcon sx={{ mr: 2 }} />
            {open && <ListItemText primary="Home" />}
          </ListItem>
          <ListItem button component="a" href="/trip">
            <TravelExploreIcon sx={{ mr: 2 }} />
            {open && <ListItemText primary="Trips" />}
          </ListItem>
          <ListItem button component="a" href="/diary">
            <BookIcon sx={{ mr: 2 }} />
            {open && <ListItemText primary="Diary" />}
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

"use client";
import { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Divider, Box } from '@mui/material';
import Slider from 'react-slick'; // Import Slider
import DiaryCard from '@/app/components/DiaryCard';
import DiaryForm from '@/app/components/DiaryForm';
import DiaryUpdate from '@/app/components/DiaryUpdate';
import DashboardLayout from '@/app/components/MyAppBar';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 


export default function DiaryPage({ params }) {
  const { TripId } = params; // Use the exact key from params
  const [trip, setTrip] = useState(null);
  const [diaries, setDiaries] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDiary, setCurrentDiary] = useState(null);

  useEffect(() => {
    if (TripId) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip/${TripId}`)
        .then(res => res.json())
        .then(data => {
          setTrip(data);
          fetchDiaries();
        })
        .catch(error => console.error("Error fetching trip:", error));
    }
  }, [TripId]);

  const fetchDiaries = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diary?tripId=${TripId}`)
      .then(res => res.json())
      .then(data => {
        setDiaries(data);
      })
      .catch(error => console.error("Error fetching diaries:", error));
  };

  const handleSaveDiary = (diaryData) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...diaryData, tripId: TripId }),
    })
      .then(res => res.json())
      .then(newDiary => {
        setDiaries(prevDiaries => [...prevDiaries, newDiary]);
        setIsAdding(false);
      })
      .catch(error => console.error("Error saving diary:", error));
  };

  const handleEditDiary = (diary) => {
    setCurrentDiary(diary);
    setIsEditing(true);
  };

  const handleUpdateDiary = (updatedDiary) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diary/${updatedDiary._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDiary),
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(updated => {
        setDiaries(prevDiaries => 
          prevDiaries.map(diary => (diary._id === updated._id ? updated : diary))
        );
        setIsEditing(false);
        setCurrentDiary(null);
      })
      .catch(error => console.error("Error updating diary:", error));
  };

  const handleDeleteDiary = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diary/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        setDiaries(prevDiaries => prevDiaries.filter(diary => diary._id !== id));
      })
      .catch(error => console.error("Error deleting diary:", error));
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 cards at a time
    slidesToScroll: 1,
  };

  return (
    <DashboardLayout>
      <Container sx={{ mt: 4, mb: 4 }}>
        {trip && (
          <>
            <Typography variant="h4" gutterBottom>{trip.name}</Typography>
            {!isAdding && (
              <Grid container justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => setIsAdding(true)}
                  sx={{ mb: 2 }}
                >
                  Add Diary
                </Button>
              </Grid>
            )}
            {isAdding && !isEditing && (
              <DiaryForm tripId={TripId} onSave={handleSaveDiary} onCancel={() => setIsAdding(false)} />
            )}
            {isEditing && currentDiary && (
              <DiaryUpdate 
                diary={currentDiary} 
                onSave={handleUpdateDiary} 
                onCancel={() => { setIsEditing(false); }} 
              />
            )}

            <Divider sx={{ my: 3 }} />

            <Box sx={{ backgroundColor: '#3C5B6F', p: 2, borderRadius: '8px' }}>
              <Slider {...settings}>
                {diaries.length > 0 ? (
                  diaries.map(diary => (
                    <div key={diary._id}>
                      <DiaryCard 
                        diary={diary} 
                        onDelete={handleDeleteDiary} 
                        onEdit={handleEditDiary} 
                      />
                    </div>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>No diary entries found.</Typography>
                  </Grid>
                )}
              </Slider>
            </Box>
          </>
        )}
      </Container>
    </DashboardLayout>
  );
}

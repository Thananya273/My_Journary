"use client";
import { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Divider } from '@mui/material';
import DiaryCard from '@/app/components/DiaryCard'; // Your existing DiaryCard component
import DiaryForm from '@/app/components/DiaryForm';
import DiaryUpdate from '@/app/components/DiaryUpdate'; // Import the new DiaryUpdate component
import DashboardLayout from '@/app/components/MyAppBar';

export default function DiaryPage({ params }) {
  const { TripId } = params; // Use the exact key from params
  const [trip, setTrip] = useState(null);
  const [diaries, setDiaries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDiary, setCurrentDiary] = useState(null); // Current diary being edited

  useEffect(() => {
    if (TripId) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip/${TripId}`)
        .then(res => res.json())
        .then(data => {
          setTrip(data);
          fetchDiaries(); // Fetch diaries after setting trip
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
      })
      .catch(error => console.error("Error saving diary:", error));
  };

  const handleEditDiary = (diary) => {
    setCurrentDiary(diary); // Set the current diary for editing
    setIsEditing(true); // Enable editing mode
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
        setIsEditing(false); // Exit editing mode
        setCurrentDiary(null); // Clear current diary
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

  return (
    <DashboardLayout>
      <Container sx={{ mt: 4, mb: 4 }}>
        {trip && (
          <>
            <Typography variant="h4" gutterBottom>{trip.name}</Typography>
            <DiaryForm onSave={handleSaveDiary} />
            <Divider sx={{ my: 3 }} />
            {diaries.length > 0 ? (
              diaries.map(diary => (
                <DiaryCard 
                  key={diary._id} 
                  diary={diary} 
                  onDelete={handleDeleteDiary} 
                  onEdit={handleEditDiary} // Pass edit handler
                />
              ))
            ) : (
              <Typography variant="body1">No diary entries found.</Typography>
            )}
          </>
        )}
        {isEditing && currentDiary && (
          <DiaryUpdate 
            diary={currentDiary} 
            onSave={handleUpdateDiary} 
            onCancel={() => { setIsEditing(false);}} 
          />
        )}
      </Container>
    </DashboardLayout>
  );
}

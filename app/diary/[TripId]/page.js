"use client";
import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import DiaryCard from '@/app/components/DiaryCard'; // Assuming you have a DiaryCard component
import DiaryForm from '@/app/components/DiaryForm';
import DashboardLayout from '@/app/components/MyAppBar';

export default function DiaryPage({ params }) {
  const { TripId } = params; // Use the exact key from params
  console.log("Trip ID:", TripId); // Now this should log the correct ID
  const [trip, setTrip] = useState(null);
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    if (TripId) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/trip/${TripId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Error fetching trip: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log("Fetched Trip Data:", data);
          setTrip(data);
          // Fetch diaries after trip data is set
          return fetchDiaries();
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  }, [TripId]);

  const fetchDiaries = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diary?tripId=${TripId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error fetching diaries: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Fetched Diaries:", data);
        setDiaries(data);
      })
      .catch(error => {
        console.error("Error fetching diaries:", error);
      });
  };

  const handleSaveDiary = (diaryData) => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/diary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...diaryData, tripId: TripId }), // Include tripId
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error saving diary: ${res.status}`);
        }
        return res.json();
      })
      .then(newDiary => {
        setDiaries(prevDiaries => [...prevDiaries, newDiary]); // Update state with new diary entry
      })
      .catch(error => {
        console.error("Error saving diary:", error);
      });
  };

  return (
    <DashboardLayout>
      <Container sx={{ mt: 4, mb: 4 }}>
        {trip && (
          <>
            <Typography variant="h4" gutterBottom>{trip.name}</Typography>
            <DiaryForm onSave={handleSaveDiary} />

            {diaries.length > 0 ? (
              diaries.map(diary => (
                <DiaryCard key={diary._id} diary={diary} />
              ))
            ) : (
              <Typography variant="body1">No diary entries found.</Typography>
            )}
          </>
        )}
      </Container>
    </DashboardLayout>
  );
}

"use client";

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import dayjs from 'dayjs';
import styles from './CustomCalendar.module.css'; // Import your CSS Module

const CustomCalendar = ({ startDate, endDate }) => {
  const start = dayjs(startDate).startOf('day');
  const end = dayjs(endDate).endOf('day');

  // Set the value to the start date or the current date if outside the range
  const currentDate = dayjs();
  const isWithinRange = currentDate.isAfter(start) && currentDate.isBefore(end);
  const value = isWithinRange ? currentDate.toDate() : start.toDate(); // Set to start date if outside the range

  const tileClassName = ({ date }) => {
    const currentDate = dayjs(date);
    const today = dayjs(); // Get today's date

    // Highlight if within the range
    if (currentDate.isSame(start, 'day') || currentDate.isSame(end, 'day') || 
        (currentDate.isAfter(start) && currentDate.isBefore(end))) {
      return styles.highlight; // Use the highlight class for the range
    }

    // Add class for today
    if (currentDate.isSame(today, 'day')) {
      return styles.today; // Apply today class
    }
    
    return null; // No highlight
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        tileClassName={tileClassName}
        value={value} // Show the start date or current date if within range
        className={styles.calendar} // Apply custom class for size
        locale="en-US" // Set locale to English
      />
    </div>
  );
};

export default CustomCalendar;

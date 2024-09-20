"use client";

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import dayjs from 'dayjs';
import styles from './CustomCalendar.module.css'; // Import your CSS Module

const CustomCalendar = ({ startDate, endDate }) => {
  const start = dayjs(startDate).startOf('day');
  const end = dayjs(endDate).endOf('day');

  const tileClassName = ({ date }) => {
    const currentDate = dayjs(date);

    if (currentDate.isSame(start, 'day') || currentDate.isSame(end, 'day') || 
        (currentDate.isAfter(start) && currentDate.isBefore(end))) {
      return styles.highlight; // Use the same class for all
    }
    return null; // No highlight
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        tileClassName={tileClassName}
        value={new Date()} // Current date to show
        className={styles.calendar} // Apply custom class for size
        locale="en-US" // Set locale to English
      />
    </div>
  );
};

export default CustomCalendar;

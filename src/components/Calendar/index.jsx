import React, { useState, useEffect } from 'react';
import styles from './Calendar.css';
import { Users } from '../../users';

const Calendar = ({ user = Users.unknown }) => {
  const [upcomingEvents, setUpcomingEvents] = useState('');

  useEffect(() => {
    const fetchCalendar = async () => {
      const response = await fetch(`api/calendar?user=${user.email}`);
      const { events } = await response.json();
      setUpcomingEvents(events);
    };
    fetchCalendar();
  }, []);

  console.log(upcomingEvents);

  return <div>Calendar.</div>;
};

export default Calendar;

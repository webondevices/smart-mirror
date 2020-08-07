import { useState, useEffect } from 'react';

const useCalendar = (user) => {
  const [upcomingEvents, setUpcomingEvents] = useState('');

  useEffect(() => {
    const fetchCalendar = async () => {
      const response = await fetch(`api/calendar?user=${user.email}`);
      const { events } = await response.json();
      setUpcomingEvents(events);
    };
    fetchCalendar();
  }, []);

  return upcomingEvents;
};

export default useCalendar;

import React from 'react';
import styles from './Calendar.css';
import { Users } from '../../users';
import useCalendar from '../../hooks/useCalendar';

const Calendar = ({ user = Users.unknown }) => {
  const upcomingEvents = useCalendar(user);

  console.log(upcomingEvents);

  return <div>Calendar.</div>;
};

export default Calendar;

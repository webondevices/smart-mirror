import React from 'react';
import styles from './Time.css';
import useTick from '../../hooks/useTick';
import { getFormattedTime } from './helpers';

export const TimeFormat = {
  Time: 'time',
  Day: 'day',
};

const options = {
  [TimeFormat.Day]: {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  },
};

const Time = ({ date, format }) => {
  const currentTime = useTick(date);

  return (
    <time className={styles.time} dateTime={currentTime}>
      {getFormattedTime(currentTime, format, options)}
    </time>
  );
};

export default Time;

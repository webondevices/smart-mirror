import React, { useState, useEffect } from 'react';
import styles from './Time.css';
import { SECOND } from '../../constants';

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

const getFormattedTime = (currentTime, format) => {
  switch (format) {
    case TimeFormat.Time:
      return `${currentTime.getHours()}:${currentTime.getMinutes()}`;
    case TimeFormat.Day:
      return currentTime.toLocaleDateString('en-GB', options[format]);
  }
};

const Time = ({ date, format }) => {
  const [currentTime, setCurrentTime] = useState(date || new Date());

  useEffect(() => {
    if (!date) {
      setInterval(() => {
        setCurrentTime(new Date());
      }, SECOND);
    }
  }, []);

  return (
    <time className={styles.time} dateTime={currentTime}>
      {getFormattedTime(currentTime, format)}
    </time>
  );
};

export default Time;

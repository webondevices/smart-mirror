import { useState, useEffect } from 'react';
import { SECOND } from '../constants';

const useTick = (date) => {
  const [currentTime, setCurrentTime] = useState(date || new Date());

  useEffect(() => {
    if (!date) {
      setInterval(() => {
        setCurrentTime(new Date());
      }, SECOND);
    }
  }, []);

  return currentTime;
};

export default useTick;

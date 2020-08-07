import React, { useContext } from 'react';
import Time, { TimeFormat } from '../../../components/Time';
import Weather, { WeatherFormat } from '../../../components/Weather';
import Calendar from '../../../components/Calendar';
import { AppContext } from '../../../appContext.js';
import { Users } from '../../../users';

const Home = () => {
  const {
    state: { faces },
  } = useContext(AppContext);

  return (
    <main>
      <Time format={TimeFormat.Time} />
      <Time format={TimeFormat.Day} />
      <Weather format={WeatherFormat.CurrentAndHourly} />
      <Calendar user={Users.matemarschalko} />
      <span>
        {faces.length > 0
          ? `Good afternoon, ${Users[faces[0]].firstName}!`
          : 'Good afternoon!'}
      </span>
    </main>
  );
};

export default Home;

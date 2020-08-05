import React, { useContext } from 'react';
import Time, { TimeFormat } from '../../../components/Time';
import Weather, { WeatherFormat } from '../../../components/Weather';
import { AppContext } from '../../../appContext.js';

const Home = () => {
  const {
    state: { faces },
  } = useContext(AppContext);

  console.log(faces);

  return (
    <main>
      <Time format={TimeFormat.Time} />
      <Time format={TimeFormat.Day} />
      <Weather format={WeatherFormat.CurrentAndHourly} />
    </main>
  );
};

export default Home;

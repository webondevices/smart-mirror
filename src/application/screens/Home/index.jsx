import React from 'react';
import Time, { TimeFormat } from '../../../components/Time';
import Weather, { WeatherFormat } from '../../../components/Weather';

const Home = () => {
  return (
    <main>
      <Time format={TimeFormat.Time} />
      <Time format={TimeFormat.Day} />

      <Weather format={WeatherFormat.CurrentAndHourly} />
    </main>
  );
};

export default Home;

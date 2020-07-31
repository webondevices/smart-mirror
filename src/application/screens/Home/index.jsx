import React from 'react';
import Time, { TimeFormat } from '../../../components/Time';

const Home = () => {
  return (
    <main>
      <Time format={TimeFormat.Time} />
      <Time format={TimeFormat.Day} />
    </main>
  );
};

export default Home;

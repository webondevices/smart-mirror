import React, { useState, useEffect } from 'react';
import styles from './Weather.css';
import WeatherIcon from '../WeatherIcon';
import { getForecast, getApiUrl, getFormattedForecast } from './utils';
import { HOUR } from '../../constants';

export const WeatherFormat = {
  Current: 'current',
  CurrentAndHourly: 'currentandhourly',
  CurrentAndDaily: 'currentanddaily',
};

const Weather = ({ format }) => {
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    async function fetchForecast() {
      const apiUrl = getApiUrl(format);
      const data = await getForecast(apiUrl);
      const formattedForecast = getFormattedForecast(format, data);
      setForecast(formattedForecast);
    }
    setInterval(fetchForecast, HOUR);
    fetchForecast();
  }, []);

  // TODO create widget component
  // Display time in new component
  const widget = (data) => (
    <div key={JSON.stringify(data)}>
      <span>
        {data.temperature.min
          ? `${data.temperature.min} - ${data.temperature.max}˚C  and ${data.description}.`
          : `${data.temperature}˚C and ${data.description}.`}
      </span>
      <WeatherIcon id={data.id} />
    </div>
  );

  return (
    <div className={styles.weather}>
      Current Weather:
      {forecast.current && widget(forecast.current)}
      {forecast.hourly &&
        format === WeatherFormat.CurrentAndHourly &&
        forecast.hourly.map((f) => widget(f))}
      {forecast.daily &&
        format === WeatherFormat.CurrentAndDaily &&
        forecast.daily.map((f) => widget(f))}
    </div>
  );
};

export default Weather;

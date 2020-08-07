import React from 'react';
import styles from './Weather.css';
import WeatherIcon from '../WeatherIcon';
import { HOUR } from '../../constants';
import useForecast from '../../hooks/useForecast';

export const WeatherFormat = {
  Current: 'current',
  CurrentAndHourly: 'currentandhourly',
  CurrentAndDaily: 'currentanddaily',
};

const Weather = ({ format }) => {
  const forecast = useForecast(format, HOUR);

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

import { WeatherFormat } from './index';
import { mockData } from './mock';

// Settings
const UNITS = 'metric';
const LAT = '51.769556';
const LON = '-0.314692';
const API_KEY = '16e6ca79189ee0b01cf3c2586a6639c8';

const MOCK = true;

export const getForecast = async (url) => {
  if (MOCK) {
    console.log('Requesting mock data...', url);
    return mockData;
  } else {
    console.log('Requesting API data...', url);
    const response = await fetch(url);
    return response.json();
  }
};

export const getApiUrl = (format) => {
  let excludes = '';
  switch (format) {
    default:
    case WeatherFormat.Current:
      excludes = '&exclude=minutely,hourly,daily';
      break;
    case WeatherFormat.CurrentAndHourly:
      excludes = '&exclude=minutely,daily';
      break;
    case WeatherFormat.CurrentAndDaily:
      excludes = '&exclude=minutely,hourly';
      break;
  }
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=${UNITS}${excludes}`;
};

export const getFormattedForecast = (format, forecast) => {
  const getWeatherFromData = (d) => ({
    timestamp: d.dt,
    temperature: d.temp.min
      ? {
          min: Math.round(parseFloat(d.temp.min)),
          max: Math.round(parseFloat(d.temp.max)),
        }
      : Math.round(parseFloat(d.temp)),
    description: Array.isArray(d.weather) && d.weather[0].description,
    id: Array.isArray(d.weather) && parseInt(d.weather[0].id),
  });

  const current = getWeatherFromData(forecast.current);

  switch (format) {
    case WeatherFormat.Current:
      return { current };
    case WeatherFormat.CurrentAndHourly:
      const in2Hours = forecast.hourly[2];
      const in4Hours = forecast.hourly[4];
      const in6Hours = forecast.hourly[6];

      return {
        current,
        hourly: [
          getWeatherFromData(in2Hours),
          getWeatherFromData(in4Hours),
          getWeatherFromData(in6Hours),
        ],
      };
    case WeatherFormat.CurrentAndDaily:
      const in1Days = forecast.daily[1];
      const in2Days = forecast.daily[2];
      const in3Days = forecast.daily[3];

      return {
        current,
        daily: [
          getWeatherFromData(in1Days),
          getWeatherFromData(in2Days),
          getWeatherFromData(in3Days),
        ],
      };
  }
};

import React from 'react';
import styles from './WeatherIcon.css';

const getIconNameFromId = (id) => {
  switch (true) {
    case [200, 201, 202, 210, 211, 212, 221, 230, 231, 232].includes(id):
      return 'thunderstorm';
    case [300, 301, 302, 310, 311, 312, 313, 314, 321].includes(id):
      return 'drizzle';
    case [500, 501, 520].includes(id):
      return 'rain-sun';
    case [500, 501].includes(id):
      return 'rain';
    case [521, 522, 531].includes(id):
      return 'heavyrain-sun';
    case [502, 503, 504, 511].includes(id):
      return 'heavyrain';
    case [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622].includes(id):
      return 'snow';
    case [701, 711, 721, 731, 741, 751, 761, 762, 771, 781].includes(id):
      return 'mist';
    case [800, 801].includes(id):
      return 'clear';
    case [802].includes(id):
      return 'cloudy-sun';
    case [803, 804].includes(id):
      return 'cloudy';
  }
};

const getIcon = (id) =>
  require(`../../images/icons/${getIconNameFromId(id)}.svg`);

const WeatherIcon = ({ id, width = '8rem', height = '8rem' }) => {
  return (
    <img className={styles.icon} src={getIcon(id)} style={{ width, height }} />
  );
};

export default WeatherIcon;

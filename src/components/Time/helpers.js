import { TimeFormat } from './';

export const getFormattedTime = (currentTime, format, options) => {
  switch (format) {
    case TimeFormat.Time:
      return `${currentTime.getHours()}:${currentTime.getMinutes()}`;
    case TimeFormat.Day:
      return currentTime.toLocaleDateString('en-GB', options[TimeFormat.Day]);
  }
};

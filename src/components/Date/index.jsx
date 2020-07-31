import React from 'react';

const options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
};

const Date = ({ date }) => {
  return (
    <time datetime={date}>{date.toLocaleDateString('en-GB', options)}</time>
  );
};

export default Date;

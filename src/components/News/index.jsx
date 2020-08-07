import React from 'react';
import styles from './News.css';
import useNews from '../../hooks/useNews';

export const NewsFormat = {
  Top: 'top',
  World: 'world',
  UK: 'uk',
};

const News = ({ type = NewsFormat.Top }) => {
  const news = useNews(type);

  console.log(news);

  return <div>News.</div>;
};

export default News;

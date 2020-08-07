import { useState, useEffect } from 'react';
import { NewsFormat } from '../components/News';

const useNews = (type) => {
  const [news, setNews] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(`api/news?type=${type}`);
      const newsData = await response.json();
      setNews(newsData);
    };
    fetchNews();
  }, [type]);

  return news;
};

export default useNews;

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;
const calendar = require('./calendar/calendar');
const news = require('./news/helpers');

app.get('/api/calendar', async (req, res) => {
  const user = req.query.user;
  const events = await calendar.getEvents(user);

  res.send({ events });
});

app.get('/api/news', async (req, res) => {
  const type = req.query.type;
  const RSSfeedURL = news.getRSSfeeds(type);
  const response = await fetch(RSSfeedURL);
  const newsRSS = await response.text();

  res.send({ newsRSS });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const express = require('express');
const app = express();
const port = 3000;
const calendar = require('./calendar/calendar');

app.get('/api/calendar', async (req, res) => {
  const user = req.query.user;
  const events = await calendar.getEvents(user);

  res.send({ events });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

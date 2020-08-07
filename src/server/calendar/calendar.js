const { google } = require('googleapis');
const { authorize } = require('./helpers');

const listEvents = (auth, user) => {
  return new Promise((resolve, reject) => {
    const calendar = google.calendar({ version: 'v3', auth });
    calendar.events.list(
      {
        calendarId: user,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      },
      (err, res) => {
        if (err) reject(`The API returned an error: ${err}`);
        resolve(res.data.items);
      },
    );
  });
};

const getEvents = async (user) => {
  const oAuth2Client = await authorize();
  const events = await listEvents(oAuth2Client, user);

  return events;
};

module.exports = {
  getEvents,
};

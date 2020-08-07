const fs = require('fs').promises;
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = './src/server/calendar/token.json';
const CREDENTIALS_PATH = './src/server/calendar/credentials.json';

const getAccessToken = (oAuth2Client) => {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) reject(`Error retrieving access token: ${err}`);
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH);
        resolve(oAuth2Client);
      });
    });
  });
};

const authorize = async () => {
  const credentials = await fs.readFile(CREDENTIALS_PATH);
  const { client_secret, client_id, redirect_uris } = JSON.parse(
    credentials,
  ).installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  try {
    const token = await fs.readFile(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch {
    return getAccessToken(oAuth2Client);
  }
};

module.exports = { authorize };

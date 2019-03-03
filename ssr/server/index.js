/* eslint-disable import/first */
/* eslint-disable no-console */
import app from './server';

const port = 8000;

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});

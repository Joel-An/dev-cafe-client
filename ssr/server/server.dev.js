/* eslint-disable import/no-extraneous-dependencies */

const UniversalHotReload = require('universal-hot-reload').default;
UniversalHotReload(
  require('../webpack.server.dev.config'),
  require('../webpack.hot.client.dev.config'),
);

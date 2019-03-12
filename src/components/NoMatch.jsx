import React, { Fragment } from 'react';
import Helmet from 'react-helmet-async';

const NoMatch = () => (
  <Fragment>
    <Helmet>
      <title>없어!</title>
      <meta name="robots" content="noindex,nofollow" />
    </Helmet>
    <div>
      <strong>Page not found!!</strong>
    </div>
  </Fragment>
);

export default NoMatch;

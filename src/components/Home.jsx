import React, { Fragment } from 'react';
import Helmet from 'react-helmet-async';

const Home = () => (
  <Fragment>
    <Helmet>
      <title>Joel&apos;s Dev Cafe</title>
      <meta
        name="description"
        content="자바스크립트를 좋아하는 사람의 블로그"
      />
      <link rel="canonical" href="https://www.rejoelve.com/" />
    </Helmet>
    <div align="center">
      How&apos;s it going?
    </div>
  </Fragment>
);

export default Home;

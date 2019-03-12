import React, { Fragment } from 'react';
import Helmet from 'react-helmet-async';

const AboutPage = () => (
  <Fragment>
    <Helmet>
      <title>About Joel | Dev Cafe</title>
      <meta
        name="description"
        content="쉬운 언어로 말하고, 개발하기 위해 노력하는 김커피입니다. 제 소개 한번 들어보실래요?"/>
    </Helmet>
    <p>Hello</p>
  </Fragment>
);


export default AboutPage;

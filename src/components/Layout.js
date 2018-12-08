import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Divider, Icon } from 'semantic-ui-react';

import { pullRight, h1 } from './layout.css';

const Layout = ({ children }) => {
  return (
    <Container>
      <Link to="/">
        <Header as="h1" className={h1}>
          Jeol's Dev Cafe
        </Header>
      </Link>
      {children}
      <Divider />
      <p className={pullRight}>
        Would you like a cup of <Icon name="coffee" color="brown" />?
      </p>
    </Container>
  );
};

export default Layout;

import React from 'react';
import { Link } from 'react-router-dom';

import HeaderMenu from './HeaderMenu';

import './Header.scss';

const Header = () => (
  <header className="main-head">
    <div className="spacer"/>
    <h1 className="title">
      <Link to="/">Joel&apos;s Dev Cafe</Link>
    </h1>
    <HeaderMenu/>
  </header>
);

export default Header;

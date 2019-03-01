import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import Routes from './Routes';
import Header from './layout/Header';
import MainPageNav from './layout/MainPageNav';

import './App.scss';
import CategoryMenu from './categories/CategoryMenu';

const App = () => (
  <div className="App">
    <Header/>
    <main className="content">
      <div className="main-content">
        <Switch>
          {renderRoutes(Routes)}
        </Switch>
      </div>
      <div className="main-nav">
        <MainPageNav/>
      </div>
    </main>
    <aside className="side">
      <CategoryMenu/>
    </aside>
    <footer className="main-footer">
      <hr/>
      <p>Would you like a cup of coffee?</p>
    </footer>
  </div>
);

export default App;

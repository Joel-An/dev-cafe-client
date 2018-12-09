import React from 'react';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import Users from './UsersPage';
import Posts from './PostsPage';
import NoMatch from './NoMatch';

import axios from 'axios';

import './App.css';

const App = () => {
  return (
    <Router>
      <div class="wrapper">
        <header className="main-head">
          <Link to="/">Joel's Dev Cafe</Link>
        </header>
        <nav class="main-nav">
          <ul>
            <li>
              <a href="">Nav 1</a>
            </li>
            <li>
              <a href="">Nav 2</a>
            </li>
            <li>
              <a href="">Nav 3</a>
            </li>
          </ul>
        </nav>
        <article class="content">
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/posts" component={Posts} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </article>
        <aside class="side">Sidebar</aside>
        <div class="ad">Advertising</div>
        <footer class="main-footer">The footer</footer>
      </div>
    </Router>
  );
};

export default App;

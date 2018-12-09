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
      <div className="wrapper">
        <header className="main-head">
          <Link to="/">Joel's Dev Cafe</Link>
          <hr />
        </header>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/users">USERS</Link>
            </li>
            <li>
              <Link to="/posts">POSTS</Link>
            </li>
            <li>
              <a href="">FREE</a>
            </li>
          </ul>
        </nav>
        <article className="content">
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/posts" component={Posts} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </article>
        <aside className="side">Sidebar</aside>
        <div className="ad">Advertising</div>
        <footer className="main-footer">
          <hr />
          Would you like a cup of coffee?
        </footer>
      </div>
    </Router>
  );
};

export default App;

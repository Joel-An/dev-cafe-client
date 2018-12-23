import React from 'react';
import {
  Switch, BrowserRouter as Router, Route, Link,
} from 'react-router-dom';

import Home from './Home';
import Users from './UsersPage';
import Posts from './PostsPage';
import NoMatch from './NoMatch';
import Login from './Login';
import Signup from './Signup';
import Header from './layout/Header';

import './App.css';

const App = () => (
  <Router>
    <div className="wrapper">
      <Header />
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/users">USERS</Link>
          </li>
          <li>
            <Link to="/posts">POSTS</Link>
          </li>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link to="/signup">SIGNUP</Link>
          </li>
        </ul>
      </nav>
      <article className="content">
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </article>
      <aside className="side">Sidebar</aside>
      <div className="ad">Advertising</div>
      <footer className="main-footer">
        <p>Would you like a cup of coffee?</p>
      </footer>
    </div>
  </Router>
);

export default App;

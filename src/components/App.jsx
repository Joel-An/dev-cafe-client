import React from 'react';
import {
  Switch, BrowserRouter as Router, Route,
} from 'react-router-dom';

import Home from './Home';
import Users from './UsersPage';
import OldPosts from './PostsPage';
import NoMatch from './NoMatch';
import Login from './Login';
import Signup from './Signup';
import Header from './layout/Header';
import CategoryManager from './categories/CategoryManager';

import './App.css';
import PostListPage from './posts/PostListPage';
import PostPage from './posts/PostPage';
import Write from './posts/Write';
import EditPostPage from './posts/EditPostPage';
import CategoryMenu from './categories/CategoryMenu';
import AdminPage from './AdminPage';

const App = () => (
  <Router>
    <div className="wrapper">
      <Header/>
      <article className="content">
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/oldPosts" component={OldPosts} />
            <Route path="/posts/:id" component={PostPage} />
            <Route exact path="/posts" component={PostListPage} />
            <Route path="/write/:categoryId" component={Write} />
            <Route path="/edit/:id" component={EditPostPage}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/categoryManager" component={CategoryManager} />
            <Route exact path="/admin" component={AdminPage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </article>
      <aside className="side">
        <CategoryMenu/>
      </aside>
      <footer className="main-footer">
        <hr/>
        <p>Would you like a cup of coffee?</p>
      </footer>
    </div>
  </Router>
);

export default App;

import React from 'react';
import {
  Switch, BrowserRouter as Router, Route, Link,
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
import CategoryMenu from './categories/CategoryMenu';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.getItem('token'),
    };
  }

  updateToken = () => {
    this.setState({ token: localStorage.getItem('token') });
  }

  logout = () => {
    localStorage.removeItem('token');
    this.updateToken();
  }

  render() {
    const { token } = this.state;
    return (<Router>
      <div className="wrapper">
        <Header/>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/users">USERS</Link>
            </li>
            <li>
              <Link to="/oldposts">POSTS</Link>
            </li>
            <li>
              <Link to="/signup">SIGNUP</Link>
            </li>
            <li>
              <Link to="/categoryManager">MANAGE CATEGORIES</Link>
            </li>
          </ul>
        </nav>
        <article className="content">
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/oldPosts" component={OldPosts} />
              <Route path="/posts/:id" render={props => (<PostPage {...props} token={token}/>)} />
              <Route exact path="/posts" component={PostListPage} />
              <Route path="/write/:categoryId" render={props => (<Write {...props} token={token}/>)} />
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/categoryManager" component={CategoryManager} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </article>
        <aside className="side">
          <CategoryMenu/>
        </aside>
        <div className="ad">Advertising</div>
        <footer className="main-footer">
          <p>Would you like a cup of coffee?</p>
        </footer>
      </div>
    </Router>);
  }
}
export default App;

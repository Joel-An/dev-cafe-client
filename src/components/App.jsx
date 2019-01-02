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
import ManageCategories from './categories/ManageCategories';

import './App.css';
import withCategoryContainer from '../containers/CategoryContainer';
import Posts from './posts/Posts';
import Post from './posts/Post';
import Write from './posts/Write';
import CategoryLinkMenu from './categories/CategoryMenu';

const CategoryMenu = withCategoryContainer(CategoryLinkMenu);

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
              <Link to="/manageCategories">MANAGE CATEGORIES</Link>
            </li>
          </ul>
        </nav>
        <article className="content">
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/oldPosts" component={OldPosts} />
              <Route path="/posts/:id" render={props => (<Post {...props} token={token}/>)} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/write" render={props => (<Write {...props} token={token}/>)} />
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/manageCategories" render={props => (<ManageCategories {...props} token={token}/>)} />
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

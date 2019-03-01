import Home from './Home';
import NoMatch from './NoMatch';
import SignupPage from './Signup';
import ManageCategoriesPage from './categories/ManageCategoriesPage';

import PostListPage from './posts/PostListPage';
import PostPage from './posts/PostPage';
import WritePostPage from './posts/Write';
import EditPostPage from './posts/EditPostPage';
import AdminPage from './AdminPage';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/posts/:id',
    component: PostPage,
  },
  {
    path: '/posts',
    component: PostListPage,
  },
  {
    path: '/write/:categoryId',
    component: WritePostPage,
  },
  {
    path: '/edit/:id',
    component: EditPostPage,
  },
  {
    path: '/signup',
    exact: true,
    component: SignupPage,
  },
  {
    path: '/categoryManager',
    exact: true,
    component: AdminPage,
  },
  {
    path: '/AdminPage',
    exact: true,
    component: ManageCategoriesPage,
  },
  {
    component: NoMatch,
  },
];


export default Routes;

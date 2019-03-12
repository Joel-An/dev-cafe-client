import UrlPattern from 'url-pattern';

import Home from './Home';
import NoMatch from './NoMatch';
import SignupPage from './Signup';
import ManageCategoriesPage from './categories/ManageCategoriesPage';

import PostListPage, { parseCategoryId } from './posts/PostListPage';
import PostPage from './posts/PostPage';
import WritePostPage from './posts/Write';
import EditPostPage from './posts/EditPostPage';
import AdminPage from './AdminPage';
import AboutPage from './AboutPage';

import {
  ssrCommonPage,
  ssrPostPage,
  ssrPostListPage,
} from '../store/actions/ssr';

import { loadCategories } from '../store/actions/categories';
import { loadPost, loadPosts } from '../store/actions/posts';
import { loadComments } from '../store/actions/comments';

const defaultFetchActions = [loadCategories()];

// eslint-disable-next-line max-len
const setFetchActions = (pageAction = ssrCommonPage(), ...fetchActions) => [pageAction, ...defaultFetchActions, ...fetchActions];

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    mapUrlToActions: () => setFetchActions(),
  },
  {
    path: '/posts/:postId',
    component: PostPage,
    mapUrlToActions: (url) => {
      const pattern = new UrlPattern('/posts/:postId');
      const { postId } = pattern.match(url);

      return setFetchActions(ssrPostPage(), loadPost(postId), loadComments(postId));
    },
  },
  {
    path: '/posts',
    component: PostListPage,
    mapUrlToActions: (url) => {
      // posts?category=all 이런 형태로 구성되어있음
      const categoryId = parseCategoryId(url);

      return setFetchActions(ssrPostListPage(), loadPosts(categoryId));
    },
  },
  {
    path: '/write/:categoryId',
    component: WritePostPage,
    mapUrlToActions: () => setFetchActions(),
  },
  {
    path: '/edit/:id',
    component: EditPostPage,
    mapUrlToActions: () => setFetchActions(),
  },
  {
    path: '/signup',
    exact: true,
    component: SignupPage,
    mapUrlToActions: () => setFetchActions(),
  },
  {
    path: '/admin',
    exact: true,
    component: AdminPage,
    mapUrlToActions: () => setFetchActions(),
  },
  {
    path: '/admin/categoryManager',
    exact: true,
    component: ManageCategoriesPage,
    mapUrlToActions: () => setFetchActions(),
  },
  {
    path: '/about',
    exact: true,
    component: AboutPage,
    mapUrlToActions: () => setFetchActions(),
  },
  {
    component: NoMatch,
    mapUrlToActions: () => setFetchActions(),
  },
];


export default Routes;

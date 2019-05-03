import { combineReducers } from 'redux';
import auth from './auth';
import entities from './entities';
import pagination from './pagination';
import editing from './editing';
import history from './history';
import popups from './popups';
import toastNotifications from './toastNotifications';


export default combineReducers({
  auth,
  entities,
  pagination,
  editing,
  history,
  popups,
  toastNotifications,
});

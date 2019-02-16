import { combineReducers } from 'redux';
import auth from './auth';
import entities from './entities';
import pagination from './pagination';
import editing from './editing';
import history from './history';
import popups from './popups';
import notifications from './notifications';


export default combineReducers({
  auth,
  entities,
  pagination,
  editing,
  history,
  popups,
  notifications,
});

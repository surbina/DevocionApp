import { combineReducers } from 'redux';

import app from './app/reducer.js';

export default combineReducers({
  app: app
});
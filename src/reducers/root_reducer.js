import { combineReducers } from 'redux';

import devotional_list from './devotional_list/reducer.js';
import devotional_view_section from './devotional_view_section/reducer.js';
import user from './user/reducer.js';

export default combineReducers({
  devotional_list,
  devotional_view_section,
  user
});
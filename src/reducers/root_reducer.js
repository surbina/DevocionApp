import { combineReducers } from 'redux';

import comment_list from './comment_list/reducer.js';
import devotional_list from './devotional_list/reducer.js';
import devotional_view_section from './devotional_view_section/reducer.js';
import user from './user/reducer.js';

export default combineReducers({
  comment_list,
  devotional_list,
  devotional_view_section,
  user
});
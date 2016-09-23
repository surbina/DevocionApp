import { Map } from 'immutable';
import {
  REQUEST_PREV_DEVOTIONAL, REQUEST_PREV_DEVOTIONAL_SUCCESS, REQUEST_PREV_DEVOTIONAL_FAIL,
  REQUEST_NEXT_DEVOTIONAL, REQUEST_NEXT_DEVOTIONAL_SUCCESS, REQUEST_NEXT_DEVOTIONAL_FAIL
} from './actions.js';

export const REDUCER_LOADED_STATUS = 'REDUCER_LOADED';
export const REDUCER_FETCHING_PREV_DEVOTIONAL_STATUS = 'REDUCER_FETCHING_PREV_DEVOTIONAL';
export const REDUCER_FETCHING_NEXT_DEVOTIONAL_STATUS = 'REDUCER_FETCHING_NEXT_DEVOTIONAL';

export const FETCHING_STATUS = 'FETCHING';
export const LOADED_STATUS = 'LOADED';
export const UNLOADED_STATUS = 'UNLOADED';

const STATUS_DEFAULT = REDUCER_LOADED_STATUS;
const CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT = '';

export default function(state = Map({
  status: STATUS_DEFAULT,
  currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
}), action) {
  switch (action.type) {
    case REQUEST_PREV_DEVOTIONAL:
      return requestPrevDevotional(state, action.publish_date);
    case REQUEST_PREV_DEVOTIONAL_SUCCESS:
      return requestPrevDevotionalSuccess(state, action.devotional);
    case REQUEST_PREV_DEVOTIONAL_FAIL:
      return requestPrevDevotionalFail(state);
    case REQUEST_NEXT_DEVOTIONAL:
      return requestNextDevotional(state, action.publish_date);
    case REQUEST_NEXT_DEVOTIONAL_SUCCESS:
      return requestNextDevotionalSuccess(state, action.devotional);
    case REQUEST_NEXT_DEVOTIONAL_FAIL:
      return requestNextDevotionalFail(state);
    default:
      return state;
  }
}

function requestPrevDevotional(state, publish_date) {
  return state.merge({
    status: REDUCER_FETCHING_PREV_DEVOTIONAL_STATUS,
    currently_devotional_working_date: publish_date
  });
}

function requestPrevDevotionalSuccess(state, devotional) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT,
    [devotional.publish_date]: {
      id: devotional.id,
      status: LOADED_STATUS,
      valid: true,
      title: devotional.title,
      passage: devotional.passage,
      body: devotional.body,
      author_name: devotional.author_name,
      publish_date: devotional.publish_date,
    }
  });
}

function requestPrevDevotionalFail(state) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
  });
}

function requestNextDevotional(state, publish_date) {
  return state.merge({
    status: REDUCER_FETCHING_NEXT_DEVOTIONAL_STATUS,
    currently_devotional_working_date: publish_date
  });
}

function requestNextDevotionalSuccess(state, devotional) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT,
    [devotional.publish_date]: {
      id: devotional.id,
      status: LOADED_STATUS,
      valid: true,
      title: devotional.title,
      passage: devotional.passage,
      body: devotional.body,
      author_name: devotional.author_name,
      publish_date: devotional.publish_date,
    }
  });
}

function requestNextDevotionalFail(state) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
  });
}
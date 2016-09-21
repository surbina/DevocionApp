import { Map } from 'immutable';

import {
  INIT,
  FETCH, FETCH_SUCCESS, FETCH_FAIL
} from './actions.js';

const UNLOADED_STATUS = 'UNLOADED';
const LOADED_STATUS = 'LOADED';
const FETCHING = 'FETCHING';

export default function app(state = Map({
  status: UNLOADED_STATUS,
  devotional: null
}), action) {
  switch(action.type) {
    case INIT:
      return init(state);
    case FETCH:
      return fetch(state);
    case FETCH_SUCCESS:
      return fetchSuccess(state, action.devotional);
    case FETCH_FAIL:
      return fetchFail(state);
    default:
      return state;
  }
}

function init(state) {
  return state.merge({
    status: LOADED_STATUS
  });
}

function fetch(state) {
  return state.merge({
    status: FETCHING
  });
}

function fetchSuccess(state, devotional) {
  return state.merge({
    status: LOADED_STATUS,
    devotional: Map(devotional)
  });
}

function fetchFail(state) {
  return state.merge({
    status: LOADED_STATUS
  });
}
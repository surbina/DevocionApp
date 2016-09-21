import { Map } from 'immutable';

import { INIT } from './actions.js';

const UNLOADED_STATUS = 'UNLOADED';
const LOADED_STATUS = 'LOADED';

export default function app(state = Map({
  status: UNLOADED_STATUS
}), action) {
  switch(action.type) {
    case INIT:
      return init(state);
    default:
      return state;
  }
}

function init(state) {
  return state.merge({
    status: LOADED_STATUS
  });
}
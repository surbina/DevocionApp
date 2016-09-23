import * as firebase from 'firebase';

import { LOADED_STATUS } from './actions.js';

export const REQUEST_PREV_DEVOTIONAL = 'REQUEST_PREV_DEVOTIONAL';
export const REQUEST_PREV_DEVOTIONAL_SUCCESS = 'REQUEST_PREV_DEVOTIONAL_SUCCESS';
export const REQUEST_PREV_DEVOTIONAL_FAIL = 'REQUEST_PREV_DEVOTIONAL_FAIL';

export const REQUEST_NEXT_DEVOTIONAL = 'REQUEST_NEXT_DEVOTIONAL';
export const REQUEST_NEXT_DEVOTIONAL_SUCCESS = 'REQUEST_NEXT_DEVOTIONAL_SUCCESS';
export const REQUEST_NEXT_DEVOTIONAL_FAIL = 'REQUEST_NEXT_DEVOTIONAL_FAIL';

export function fetchPrevDevotionalAction(publish_date, successCallbackAction, emptyCallbackAction) {
  return function (dispatch, getState) {
    const state = getState();
    if(shouldFetchDevotional(state, publish_date)) {
      dispatch(requestPrevDevotionalAction(publish_date));

      firebase.database()
        .ref('devotional_list/')
        .orderByChild('publish_date')
        .endAt(publish_date)
        .limitToLast(1)
        .once('value')
        .then(success)
        .catch(error);
    }
    else {
      executeCallback(state.devotional_list.get(publish_date).toJS());
    }

    function success(snapshot) {
      if(snapshot.hasChildren()) {
        const key = Object.keys(snapshot.val())[0];
        const devotional = snapshot.val()[key];
        dispatch(requestPrevDevotionalSuccessAction(devotional));
        executeCallback(devotional);
      }
      else {
        dispatch(requestPrevDevotionalFailAction({
          code: 'MISSING_DEVOTIONAL',
          message: 'Devotional not found'
        }));

        if(!!emptyCallbackAction) {
          dispatch(emptyCallbackAction.call());
        }
      }
    }

    function executeCallback(devotional) {
      if(!!successCallbackAction) {
        dispatch(successCallbackAction.call(null, devotional));
      }
    }

    function error(error) {
      dispatch(requestPrevDevotionalFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

export function fetchNextDevotionalAction(publish_date, successCallbackAction, emptyCallbackAction) {
  return function (dispatch, getState) {
    const state = getState();
    if(shouldFetchDevotional(state, publish_date)) {
      dispatch(requestPrevDevotionalAction(publish_date));

      firebase.database()
        .ref('devotional_list/')
        .orderByChild('publish_date')
        .startAt(publish_date)
        .limitToFirst(1)
        .once('value')
        .then(success)
        .catch(error);
    }
    else {
      executeCallback(state.devotional_list.get(publish_date).toJS());
    }

    function success(snapshot) {
      if(snapshot.hasChildren()) {
        const key = Object.keys(snapshot.val())[0];
        const devotional = snapshot.val()[key];
        dispatch(requestNextDevotionalSuccessAction(devotional));
        executeCallback(devotional);
      }
      else {
        dispatch(requestNextDevotionalFailAction({
          code: 'MISSING_DEVOTIONAL',
          message: 'Devotional not found'
        }));

        if(!!emptyCallbackAction) {
          dispatch(emptyCallbackAction.call());
        }
      }
    }

    function executeCallback(devotional) {
      if(!!successCallbackAction) {
        dispatch(successCallbackAction.call(null, devotional));
      }
    }

    function error(error) {
      dispatch(requestNextDevotionalFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

function shouldFetchDevotional(state, publish_date) {
  return state.devotional_list.get(publish_date) === undefined ||
    (!state.devotional_list.getIn([publish_date, 'valid']) &&
    state.devotional_list.getIn([publish_date, 'status']) === LOADED_STATUS);
}

export function requestPrevDevotionalAction(publish_date) {
  return {
    type: REQUEST_PREV_DEVOTIONAL,
    publish_date
  };
}

export function requestPrevDevotionalSuccessAction(devotional) {
  return {
    type: REQUEST_PREV_DEVOTIONAL_SUCCESS,
    devotional
  };
}

export function requestPrevDevotionalFailAction(error) {
  return {
    type: REQUEST_PREV_DEVOTIONAL_FAIL,
    error
  };
}

export function requestNextDevotionalAction(publish_date) {
  return {
    type: REQUEST_NEXT_DEVOTIONAL,
    publish_date
  };
}

export function requestNextDevotionalSuccessAction(devotional) {
  return {
    type: REQUEST_NEXT_DEVOTIONAL_SUCCESS,
    devotional
  };
}

export function requestNextDevotionalFailAction(error) {
  return {
    type: REQUEST_NEXT_DEVOTIONAL_FAIL,
    error
  };
}
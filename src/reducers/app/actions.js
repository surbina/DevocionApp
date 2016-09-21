import * as firebase from 'firebase';

export const INIT = 'INIT';

export const FETCH = 'FETCH';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';


export function fetchFirebaseAction() {
  return function(dispatch) {
    dispatch(fetchAction());

    firebase.database()
      .ref('devotional_list/')
      .orderByChild('publish_date')
      .limitToLast(1)
      .once('value')
      .then(success)
      .catch(error);

    function success(snapshot) {
      const key = Object.keys(snapshot.val())[0];
      const devotional = snapshot.val()[key];
      dispatch(fetchSuccessAction(devotional));
    }

    function error(error) {
      dispatch(fetchFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

export function initAction(devotional) {
  return {
    type: INIT
  };
}

export function fetchAction() {
  return {
    type: FETCH
  };
}

export function fetchSuccessAction(devotional) {
  return {
    type: FETCH_SUCCESS,
    devotional
  };
}

export function fetchFailAction(error) {
  return {
    type: FETCH_FAIL,
    error
  };
}
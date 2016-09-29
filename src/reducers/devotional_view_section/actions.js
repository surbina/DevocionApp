import { ToastAndroid } from 'react-native';

import {
  fetchPrevDevotionalAction,
  fetchNextDevotionalAction
} from '../devotional_list/actions.js';

export const LOAD_DEVOTIONAL_VIEW = 'LOAD_DEVOTIONAL_VIEW';
export const SET_CURRENT_DEVOTIONAL = 'SET_CURRENT_DEVOTIONAL';

export function loadCurrentOrPreviousDevotionalAction(devotionalPublishDate, devotionalNotFoundCallback) {
  return function(dispatch) {
    dispatch(loadDevotionalAction(devotionalPublishDate));
    dispatch(fetchPrevDevotionalAction(devotionalPublishDate, updateCurrentDevotional, devotionalNotFoundCallback));
  };
}

export function loadCurrentOrNextDevotionalAction(devotionalPublishDate, devotionalNotFoundCallback) {
  return function(dispatch) {
    dispatch(loadDevotionalAction(devotionalPublishDate));
    dispatch(fetchNextDevotionalAction(devotionalPublishDate, updateCurrentDevotional, devotionalNotFoundCallback));
  };
}

export function updateCurrentDevotional(devotional) {
  return function(dispatch, getState) {
    const state = getState();
    dispatch(setCurrentDevotionalAction(devotional));
    if(state.devotional_view_section.get('target_date') !== devotional.publish_date) {
      ToastAndroid.show('No encontramos un devocional para esta fecha, así que navegamos hacia el más próximo', ToastAndroid.LONG);
    }
  };
}

export function loadDevotionalAction(devotionalPublishDate) {
  return {
    type: LOAD_DEVOTIONAL_VIEW,
    devotionalPublishDate
  };
}

export function setCurrentDevotionalAction(devotional) {
  return {
    type: SET_CURRENT_DEVOTIONAL,
    devotional
  };
}
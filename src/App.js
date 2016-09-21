import React, { Component } from 'react';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';

import firebaseConfig from './firebase_config.js';
import store from './store.js';
import Navigation from './Navigation.js';

firebase.initializeApp(firebaseConfig);

class DevocionApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default DevocionApp;

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';
import esLocale from 'moment/locale/es';
import * as firebase from 'firebase';

import firebaseConfig from './firebase_config.js';
import store from './store.js';
import Navigation from './Navigation.js';

firebase.initializeApp(firebaseConfig);
moment.locale('es', esLocale);

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

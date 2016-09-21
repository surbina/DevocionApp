import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store.js';
import Navigation from './Navigation.js';

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

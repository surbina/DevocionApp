import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet
} from 'react-native';

import Toolbar from '../components/Toolbar.js';

import {
  signOutAction
} from '../reducers/user/actions.js';

import {
  SIGNED_USER_STATUS
} from '../reducers/user/reducer.js';

import {
  SIGN_IN_ROUTE_INDEX,
  SIGN_UP_ROUTE_INDEX,
  RESET_PASSWORD_ROUTE_INDEX,
  DEVOTIONAL_VIEW_ROUTE_INDEX
} from '../Navigation.js';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.anonymousUserActions = [{
      title: 'Devocionales',
      action: this._handleNavigateToRoute.bind(this, DEVOTIONAL_VIEW_ROUTE_INDEX)
    }, {
      title: 'Ingresar',
      action: this._handleNavigateToRoute.bind(this, SIGN_IN_ROUTE_INDEX)
    }, {
      title: 'Registrarse',
      action: this._handleNavigateToRoute.bind(this, SIGN_UP_ROUTE_INDEX)
    }, {
      title: 'Reiniciar contraseña',
      action: this._handleNavigateToRoute.bind(this, RESET_PASSWORD_ROUTE_INDEX)
    }];

    this.signedInUserActions = [{
      title: 'Salir',
      action: this._handleDispatchAction.bind(this, signOutAction),
    }]
  }

  _handleNavigateToRoute(index, params) {
    this.props.navigator.replaceAtIndex({ index, params }, 0);
  }

  _handleDispatchAction(action) {
    this.props.dispatch(action());
  }

  render() {
    let userName = '',
      actions = this.anonymousUserActions;

    if(this.props.user.get('status') === SIGNED_USER_STATUS) {
      userName = this.props.user.get('user_first_name');
      actions = this.signedInUserActions;
    }

    console.log('Toolbar: ', Toolbar);

    return(
      <View style={styles.container}>
        <Toolbar
          title={this.props.title}
          subtitle={userName}
          actions={actions} />

        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const ConnectedAppContainer = connect(mapStateToProps)(AppContainer);

export { AppContainer };
export default ConnectedAppContainer;
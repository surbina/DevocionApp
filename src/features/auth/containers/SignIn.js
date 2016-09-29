import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

import { DrawerContainer } from '../../../components/drawer/Drawer.js';
import SignInForm from '../components/SignInForm.js';
import { signInAction } from '../../../reducers/user/actions.js';
import { DEVOTIONAL_VIEW_ROUTE_INDEX } from '../../../Navigation.js';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitSignIn = this._handleSubmitSignIn.bind(this);
    this.redirectOnSuccessSignIn = this._redirectOnSuccessSignIn.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleSubmitSignIn(user) {
    this.props.dispatch(signInAction(user, this.redirectOnSuccessSignIn));
  }

  _redirectOnSuccessSignIn() {
    const item = {
      index: DEVOTIONAL_VIEW_ROUTE_INDEX
    };
    this.props.navigator.replaceAtIndex(item, 0);
  }

  render() {
    return (
      <DrawerContainer navigator={this.props.navigator}>
        <SignInForm onSignInSubmit={this.handleSubmitSignIn} />
      </DrawerContainer>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export const SignInContainer = connect(mapStateToProps)(SignIn);

export default SignIn;

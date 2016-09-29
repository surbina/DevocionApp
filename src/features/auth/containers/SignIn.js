import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

import { DrawerContainer } from '../../../components/drawer/Drawer.js';
import SignInForm from '../components/SignInForm.js';

import { signInAction } from '../../../reducers/user/actions.js';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitSignIn = this._handleSubmitSignIn.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleSubmitSignIn(user) {
    this.props.dispatch(signInAction(user));
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

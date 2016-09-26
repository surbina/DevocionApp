import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  View
} from 'react-native';

import Drawer from '../../../components/drawer/Drawer.js';

import SignInForm from '../components/SignInForm.js';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.handleSubmitSignIn = this._handleSubmitSignIn.bind(this);
  }

  _handleSubmitSignIn(user) {
    console.log('USER: ', user);
  }

  render() {
    return (
      <Drawer navigator={this.props.navigator}>
        <SignInForm onSignInSubmit={this.handleSubmitSignIn} />
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export const SignInContainer = connect(mapStateToProps)(SignIn);

export default SignIn;

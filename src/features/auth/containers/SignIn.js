import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text
} from 'react-native';

import Drawer from '../../../components/drawer/Drawer.js';
import SignInForm from '../components/SignInForm.js';

import { signInAction } from '../../../reducers/user/actions.js';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.handleSubmitSignIn = this._handleSubmitSignIn.bind(this);
  }

  _handleSubmitSignIn(user) {
    console.log('USER: ', user);
    this.props.dispatch(signInAction(user));
  }

  render() {
    return (
      <Drawer navigator={this.props.navigator}>
        <SignInForm onSignInSubmit={this.handleSubmitSignIn} />
        <Text>USUARIO STATUS: {this.props.user.get('status')}</Text>
        <Text>USUARIO LOGUEADO: {this.props.user.get('user_first_name')}</Text>
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  const user = state.user;
  return {
    user
  };
}

export const SignInContainer = connect(mapStateToProps)(SignIn);

export default SignIn;

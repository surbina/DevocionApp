import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text
} from 'react-native';

import {
  CREATING_USER_STATUS,
  VALID_USER_STATUS,
  UPDATING_USER_DATA_STATUS
} from '../../../reducers/user/reducer.js'

import Drawer from '../../../components/drawer/Drawer.js';
import SignUpForm from '../components/SignUpForm.js';

import { createNewUserAction } from '../../../reducers/user/actions.js';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitSignUp = this._handleSubmitSignUp.bind(this);
  }

  _handleSubmitSignUp(user) {
    this.props.dispatch(createNewUserAction(user));
  }

  render() {
    return (
      <Drawer navigator={this.props.navigator}>
        <SignUpForm onSignUpSubmit={this.handleSubmitSignUp} />
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSigningUp: state.user.get('status') === CREATING_USER_STATUS || state.user.get('status') === VALID_USER_STATUS || state.user.get('status') === UPDATING_USER_DATA_STATUS
  };
}

export const SignUpContainer = connect(mapStateToProps)(SignUp);

export default SignUp;

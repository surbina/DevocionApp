import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

import {
  CREATING_USER_STATUS,
  VALID_USER_STATUS,
  UPDATING_USER_DATA_STATUS
} from '../../../reducers/user/reducer.js'

import { DrawerContainer } from '../../../components/drawer/Drawer.js';
import SignUpForm from '../components/SignUpForm.js';

import { createNewUserAction } from '../../../reducers/user/actions.js';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitSignUp = this._handleSubmitSignUp.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleSubmitSignUp(user) {
    this.props.dispatch(createNewUserAction(user));
  }

  render() {
    return (
      <DrawerContainer navigator={this.props.navigator}>
        <SignUpForm onSignUpSubmit={this.handleSubmitSignUp} />
      </DrawerContainer>
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

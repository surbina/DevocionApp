import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';
import dismissKeyboard from 'dismissKeyboard';

import {
  CREATING_USER_STATUS,
  VALID_USER_STATUS,
  UPDATING_USER_DATA_STATUS
} from '../../../reducers/user/reducer.js'

import AppContainer from '../../../components/AppContainer.js';
import SignUpForm from '../components/SignUpForm.js';
import { createNewUserAction } from '../../../reducers/user/actions.js';
import contentStyle from '../../../styles/content.js';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitSignUp = this._handleSubmitSignUp.bind(this);
    this.redirectOnSuccessSignUp = this._redirectOnSuccessSignUp.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleSubmitSignUp(user) {
    this.props.dispatch(createNewUserAction(user, this.redirectOnSuccessSignUp));
  }

  _redirectOnSuccessSignUp() {
    const item = {
      index: DEVOTIONAL_VIEW_ROUTE_INDEX
    };
    this.props.navigator.replaceAtIndex(item, 0);
  }

  render() {
    const contentContainerStyle = {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
    
    return (
      <AppContainer
        title='Registrate'
        navigator={this.props.navigator}>
        <Container> 
          <Content
            style={contentStyle}
            contentContainerStyle={contentContainerStyle}
            keyboardShouldPersistTaps={true}>
            <SignUpForm
              onSignUpSubmit={this.handleSubmitSignUp}
              isSigningUp={this.props.isSigningUp} />
          </Content>
        </Container>
      </AppContainer>
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

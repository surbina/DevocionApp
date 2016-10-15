import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';
import dismissKeyboard from 'dismissKeyboard';

import AppContainer from '../../../components/AppContainer.js';
import SignInForm from '../components/SignInForm.js';
import { signInAction } from '../../../reducers/user/actions.js';
import { DEVOTIONAL_VIEW_ROUTE_INDEX } from '../../../Navigation.js';
import contentStyle from '../../../styles/content.js';
import {
  SIGNING_IN_STATUS,
  VALID_USER_STATUS,
  FETCHING_USER_DATA_STATUS
} from '../../../reducers/user/reducer.js'

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
    const contentContainerStyle = {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <AppContainer
        title='Ingresa a la aplicación'
        navigator={this.props.navigator}>
        <Container> 
          <Content
            style={contentStyle}
            contentContainerStyle={contentContainerStyle}
            keyboardShouldPersistTaps={true}>
            <SignInForm
              onSignInSubmit={this.handleSubmitSignIn}
              isSigningIn={this.props.isSigningIn} />
          </Content>
        </Container>
      </AppContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSigningIn: state.user.get('status') === SIGNING_IN_STATUS || state.user.get('status') === VALID_USER_STATUS || state.user.get('status') === FETCHING_USER_DATA_STATUS
  };
}

export const SignInContainer = connect(mapStateToProps)(SignIn);

export default SignIn;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';
import dismissKeyboard from 'dismissKeyboard';

import {
  CREATING_USER_STATUS,
  VALID_USER_STATUS,
  UPDATING_USER_DATA_STATUS
} from '../../../reducers/user/reducer.js'

import { DrawerContainer } from '../../../components/drawer/Drawer.js';
import SignUpForm from '../components/SignUpForm.js';
import { createNewUserAction } from '../../../reducers/user/actions.js';
import contentStyle from '../../../styles/content.js';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitSignUp = this._handleSubmitSignUp.bind(this);
    this.redirectOnSuccessSignUp = this._redirectOnSuccessSignUp.bind(this);
    this.handleOpenDrawer = this._handleOpenDrawer.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleSubmitSignUp(user) {
    this.props.dispatch(createNewUserAction(user, this.redirectOnSuccessSignUp));
  }

  _handleOpenDrawer() {
    dismissKeyboard();
    this.drawer.getWrappedInstance().openDrawer();
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
      <DrawerContainer
        navigator={this.props.navigator}
        ref={d => this.drawer = d}>
        <Container> 
          <Header>
            <Button
              transparent
              onPress={this.handleOpenDrawer}>
              <Icon name='ios-menu' />
            </Button>
            <Title>Registrate</Title>
          </Header>
          <Content
            style={contentStyle}
            contentContainerStyle={contentContainerStyle}
            keyboardShouldPersistTaps={true}>
            <SignUpForm
              onSignUpSubmit={this.handleSubmitSignUp}
              isSigningUp={this.props.isSigningUp} />
          </Content>
        </Container>
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

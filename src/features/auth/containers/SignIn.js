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

import { DrawerContainer } from '../../../components/drawer/Drawer.js';
import SignInForm from '../components/SignInForm.js';
import { signInAction } from '../../../reducers/user/actions.js';
import { DEVOTIONAL_VIEW_ROUTE_INDEX } from '../../../Navigation.js';
import contentStyle from '../../../styles/content.js';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitSignIn = this._handleSubmitSignIn.bind(this);
    this.redirectOnSuccessSignIn = this._redirectOnSuccessSignIn.bind(this);
    this.handleOpenDrawer = this._handleOpenDrawer.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleSubmitSignIn(user) {
    this.props.dispatch(signInAction(user, this.redirectOnSuccessSignIn));
  }

  _handleOpenDrawer() {
    this.drawer.getWrappedInstance().openDrawer();
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
            <Title>Ingresa a la aplicación</Title>
          </Header>
          <Content
            style={contentStyle}
            contentContainerStyle={contentContainerStyle}>
            <SignInForm onSignInSubmit={this.handleSubmitSignIn} />
          </Content>
        </Container>
      </DrawerContainer>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export const SignInContainer = connect(mapStateToProps)(SignIn);

export default SignIn;

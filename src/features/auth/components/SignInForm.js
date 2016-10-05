import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Input,
  InputGroup,
  Button,
  Spinner
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';

import authFormStyle from '../../../styles/authForm.js';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state ={
      email: '',
      password: ''
    };

    this.handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleFormSubmit() {
    const email = this.state.email.trim();
    const password = this.state.password;

    if(!email || !password) {
      return;
    }

    this.props.onSignInSubmit({
      email,
      password
    });
  }

  render() {
    return (
      <View style={authFormStyle.form}>
        <InputGroup>
          <Input
            onChangeText={(email) => this.setState({email})}
            keyboardType='email-address'
            placeholder='Email' />
        </InputGroup>
        <InputGroup>
          <Input
            onChangeText={(password) => this.setState({password})}
            placeholder='Contraseña'
            secureTextEntry={true} />
        </InputGroup>
         {this.props.isSigningIn ?
          <Spinner color='blue' /> :
          <Button
            style={authFormStyle.button}
            onPress={this.handleFormSubmit}>
            Ingresar
          </Button>}
      </View>
    );
  }
}

export default SignInForm;

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
import dismissKeyboard from 'dismissKeyboard';

import ErrorMessage from '../../../components/ErrorMessage.js';
import authFormStyle from '../../../styles/authForm.js';
import textErrorStyle from '../../../styles/textError.js';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state ={
      email: '',
      emailValid: false,
      emailValidationMessage: '',
      password: '',
      passwordValid: false,
      passwordValidationMessage: ''
    };

    this.handleFormSubmit = this._handleFormSubmit.bind(this);
    this.validateEmail = this._validateEmail.bind(this);
    this.validatePassword = this._validatePassword.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleFormSubmit() {
    dismissKeyboard();
    const email = this.state.email.trim();
    const password = this.state.password;

    if(!this.validateEmail() | !this.validatePassword()) {
      return
    }

    this.props.onSignInSubmit({
      email,
      password
    });
  }

  _validateEmail() {
    const regex = /(?!.*\.\.)("[!-~ ]+"|[0-9A-Z!#-'*-\/=?^-~]+)@((?![-])[A-Za-z0-9-]*[A-Za-z-]+[A-Za-z0-9-]*(?![-])\.*)+\.[a-z]+/g;
    const isValid = regex.test(this.state.email);
    const validationMessage = !isValid ? 'Por favor introduce una dirección de email con el siguiente formato: usuario@proveedor.com' : '';

    this.setState({
      emailValid: isValid,
      emailValidationMessage: validationMessage
    });

    return isValid;
  }

  _validatePassword() {
    const isValid = this.state.password.length > 0;
    const validationMessage = !isValid ? 'Por favor introduce una contraseña' : '';

    this.setState({
      passwordValid: isValid,
      passwordValidationMessage: validationMessage
    });

    return isValid;
  }

  render() {
    let showEmailError = !this.state.emailValid && !!this.state.emailValidationMessage;
    const emailInputGroupProps = {
      error: showEmailError
    };

    let showPasswordError = !this.state.passwordValid && !!this.state.passwordValidationMessage;
    const passwordInputGroupProps = {
      error: showPasswordError
    };

    return (
      <View style={authFormStyle.form}>
        <InputGroup {...emailInputGroupProps}>
          <Input
            style={showEmailError && textErrorStyle}
            onChangeText={(email) => this.setState({email})}
            keyboardType='email-address'
            placeholder='Email' />
        </InputGroup>
        <ErrorMessage showMessage={showEmailError}>
          {this.state.emailValidationMessage}
        </ErrorMessage>
        <InputGroup {...passwordInputGroupProps}>
          <Input
            style={showPasswordError && textErrorStyle}
            onChangeText={(password) => this.setState({password})}
            placeholder='Contraseña'
            secureTextEntry={true} />
        </InputGroup>
        <ErrorMessage showMessage={showPasswordError}>
          {this.state.passwordValidationMessage}
        </ErrorMessage>
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

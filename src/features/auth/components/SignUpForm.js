import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Input,
  InputGroup,
  Button,
  Icon,
  Spinner
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';
import dismissKeyboard from 'dismissKeyboard';

import ErrorMessage from '../../../components/ErrorMessage.js';
import authFormStyle from '../../../styles/authForm.js';
import textErrorStyle from '../../../styles/textError.js';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state ={
      firstName: '',
      firstNameValid: false,
      firstNameValidationMessage: '',
      lastName: '',
      lastNameValid: false,
      lastNameValidationMessage: '',
      email: '',
      emailValid: false,
      emailValidationMessage: '',
      password: '',
      passwordValid: false,
      passwordValidationMessage: '',
      confirmPassword: '',
      confirmPasswordValid: false,
      confirmPasswordValidationMessage: ''
    };

    this.handleFormSubmit = this._handleFormSubmit.bind(this);

    this.validateFirstName = this._validateFirstName.bind(this);
    this.validateLastName = this._validateLastName.bind(this);
    this.validateEmail = this._validateEmail.bind(this);
    this.validatePassword = this._validatePassword.bind(this);
    this.validateConfirmPassword = this._validateConfirmPassword.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleFormSubmit() {
    dismissKeyboard();
    const firstName = this.state.firstName.trim();
    const lastName = this.state.lastName.trim();
    const email = this.state.email.trim();
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;

    if(!this.validateFirstName() |
       !this.validateLastName() |
       !this.validateEmail() |
       !this.validatePassword() |
       !this.validateConfirmPassword()) {
      return;
    }

    this.props.onSignUpSubmit({
      firstName,
      lastName,
      email,
      password
    });
  }

  _validateFirstName() {
    const isValid = !!this.state.firstName;
    const validationMessage = !isValid ? 'Por favor ingresa tu nombre' : '';

    this.setState({
      firstNameValid: isValid,
      firstNameValidationMessage: validationMessage
    });

    return isValid;
  }
  
  _validateLastName() {
    const isValid = !!this.state.lastName;
    const validationMessage = !isValid ? 'Por favor ingresa tu apellido' : '';

    this.setState({
      lastNameValid: isValid,
      lastNameValidationMessage: validationMessage
    });

    return isValid;
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
    const isValid = this.state.password.length >= 6;
    const validationMessage = !isValid ? 'Por favor introduce un password más fuerte (al menos 6 caracteres)' : '';

    this.setState({
      passwordValid: isValid,
      passwordValidationMessage: validationMessage
    });

    return isValid;
  }
  
  _validateConfirmPassword() {
    const isValid = this.state.confirmPassword === this.state.password;
    const validationMessage = !isValid ? 'Las contraseñas no concuerdan' : '';

    this.setState({
      confirmPasswordValid: isValid,
      confirmPasswordValidationMessage: validationMessage
    });

    return isValid;
  }

  render() {
    let showFirstNameError = !this.state.firstNameValid && !!this.state.firstNameValidationMessage;
    const firstNameInputGroupProps = {
      error: showFirstNameError
    };

    let showLastNameError = !this.state.lastNameValid && !!this.state.lastNameValidationMessage;
    const lastNameInputGroupProps = {
      error: showLastNameError
    };

    let showEmailError = !this.state.emailValid && !!this.state.emailValidationMessage;
    const emailInputGroupProps = {
      error: showEmailError
    };

    let showPasswordError = !this.state.passwordValid && !!this.state.passwordValidationMessage;
    const passwordInputGroupProps = {
      error: showPasswordError
    };

    let showConfirmPasswordError = !this.state.confirmPasswordValid && !!this.state.confirmPasswordValidationMessage;
    const confirmPasswordInputGroupProps = {
      error: showConfirmPasswordError
    };

    return (
      <View style={authFormStyle.form}>
        <InputGroup {...firstNameInputGroupProps}>
          <Input
            style={showFirstNameError && textErrorStyle}
            onChangeText={(firstName) => this.setState({firstName})}
            placeholder='Nombre' />
        </InputGroup>
        <ErrorMessage showMessage={showFirstNameError}>
          {this.state.firstNameValidationMessage}
        </ErrorMessage>
        <InputGroup {...lastNameInputGroupProps}>
          <Input
            style={showLastNameError && textErrorStyle}
            onChangeText={(lastName) => this.setState({lastName})}
            placeholder='Apellido' />
        </InputGroup>
        <ErrorMessage showMessage={showLastNameError}>
          {this.state.lastNameValidationMessage}
        </ErrorMessage>
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
        <InputGroup {...confirmPasswordInputGroupProps}>
          <Input
            style={showConfirmPasswordError && textErrorStyle}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            placeholder='Confirmar Contraseña'
            secureTextEntry={true} />
        </InputGroup>
        <ErrorMessage showMessage={showConfirmPasswordError}>
          {this.state.confirmPasswordValidationMessage}
        </ErrorMessage>
        {this.props.isSigningUp ?
          <Spinner color='blue' /> :
          <Button
            style={authFormStyle.button}
            onPress={this.handleFormSubmit}>
            Registrarse
          </Button>}
      </View>
    );
  }
}

export default SignUpForm;

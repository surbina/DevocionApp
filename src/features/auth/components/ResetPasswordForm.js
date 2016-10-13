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

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state ={
      email: '',
      emailValid: false,
      emailValidationMessage: ''
    };

    this.handleFormSubmit = this._handleFormSubmit.bind(this);
    this.validateEmail = this._validateEmail.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleFormSubmit() {
    dismissKeyboard();
    const email = this.state.email.trim();

    if(!this.validateEmail()) {
      return;
    }

    this.props.onResetPasswordSubmit(email);
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

  render() {
    let showEmailError = !this.state.emailValid && !!this.state.emailValidationMessage;
    const emailInputGroupProps = {
      error: showEmailError
    };

    return (
      <View style={authFormStyle.form}>
        <InputGroup {...emailInputGroupProps}>
          <Input
            style={showEmailError && textErrorStyle}
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
            keyboardType='email-address'
            placeholder='Email' />
        </InputGroup>
        <ErrorMessage showMessage={showEmailError}>
          {this.state.emailValidationMessage}
        </ErrorMessage>
        {this.props.isSendingResetPasswordMail ?
          <Spinner color='blue' /> :
          <Button
            style={authFormStyle.button}
            onPress={this.handleFormSubmit}>
            Enviar mail
          </Button>}
      </View>
    );
  }
}

export default ResetPasswordForm;

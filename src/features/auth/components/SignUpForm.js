import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Input,
  InputGroup,
  Button,
  Icon
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';

import authFormStyle from '../../../styles/authForm.js';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state ={
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleFormSubmit() {
    const firstName = this.state.firstName.trim();
    const lastName = this.state.lastName.trim();
    const email = this.state.email.trim();
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;

    if( !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !password !== !confirmPassword) {
      return;
    }

    this.props.onSignUpSubmit({
      firstName,
      lastName,
      email,
      password
    });
  }

  render() {
    return (
      <View style={authFormStyle.form}>
        <InputGroup>
          <Input
            onChangeText={(firstName) => this.setState({firstName})}
            placeholder='Nombre' />
        </InputGroup>
        <InputGroup>
          <Input
            onChangeText={(lastName) => this.setState({lastName})}
            placeholder='Apellido' />
        </InputGroup>
        <InputGroup>
          <Input
            onChangeText={(email) => this.setState({email})}
            placeholder='Email' />
        </InputGroup>
        <InputGroup>
          <Input
            onChangeText={(password) => this.setState({password})}
            placeholder='Contraseña'
            secureTextEntry={true} />
        </InputGroup>
        <InputGroup>
          <Input
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            placeholder='Confirmar Contraseña'
            secureTextEntry={true} />
        </InputGroup>
        <Button
          style={authFormStyle.button}
          onPress={this.handleFormSubmit}>
          Registrarse
        </Button>
      </View>
    );
  }
}

export default SignUpForm;

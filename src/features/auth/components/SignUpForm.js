import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

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
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(firstName) => this.setState({firstName})}
          placeholder="Nombre"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(lastName) => this.setState({lastName})}
          placeholder="Apellido"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          placeholder="Email"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          placeholder="Contraseña"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(confirmPassword) => this.setState({confirmPassword})}
          placeholder="Confirmar Contraseña"
        />
        <TouchableHighlight
          onPress={this._handleFormSubmit.bind(this)}
          style={styles.buttonPrev} >
            <Text>Registrarse</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonPrev: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    height: 100,
    backgroundColor: 'red'
  }
});


export default SignUpForm;

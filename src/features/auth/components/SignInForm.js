import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import {
  Input,
  InputGroup,
  Button,
  Icon
} from 'native-base';

import shallowCompare from 'react-addons-shallow-compare';

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
      <View style={styles.form}>
        <InputGroup>
          <Icon name='ios-person' />
          <Input
            onChangeText={(email) => this.setState({email})}
            placeholder='Email' />
        </InputGroup>
        <InputGroup>
          <Icon name='ios-unlock' />
          <Input
            onChangeText={(password) => this.setState({password})}
            placeholder='Contraseña'
            secureTextEntry={true} />
        </InputGroup>
        <Button
          style={styles.button}
          onPress={this.handleFormSubmit}>
          Ingresar
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    borderWidth: 1,
    borderColor: '#DDD',
    width: 300,
    padding: 10,
    top: -50,
    borderRadius: 4
  },
  button: {
    alignSelf: 'center',
    marginTop: 10
  }
});


export default SignInForm;

import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';



class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state ={
      email: '',
      password: ''
    };
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
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          placeholder="Email"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          placeholder="Password"
        />
        <TouchableHighlight
          onPress={this._handleFormSubmit.bind(this)}
          style={styles.buttonPrev} >
            <Text>INGRESAR</Text>
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


export default SignInForm;

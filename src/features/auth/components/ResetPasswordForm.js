import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state ={
      email: ''
    };
  }

  _handleFormSubmit() {
    const email = this.state.email.trim();

    if(!email) {
      return;
    }

    this.props.onResetPasswordSubmit(email);
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          placeholder="Email"
        />
        <TouchableHighlight
          onPress={this._handleFormSubmit.bind(this)}
          style={styles.buttonPrev} >
            <Text>ENVIAR MAIL</Text>
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


export default ResetPasswordForm;

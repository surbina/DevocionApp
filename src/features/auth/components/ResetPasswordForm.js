import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Input,
  InputGroup,
  Button
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';

import authFormStyle from '../../../styles/authForm.js';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state ={
      email: ''
    };

    this.handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
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
      <View style={authFormStyle.form}>
        <InputGroup>
          <Input
            onChangeText={(email) => this.setState({email})}
            placeholder='Email' />
        </InputGroup>
        <Button
          style={authFormStyle.button}
          onPress={this.handleFormSubmit}>
          Enviar mail
        </Button>
      </View>
    );
  }
}

export default ResetPasswordForm;

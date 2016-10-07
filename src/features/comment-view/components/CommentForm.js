import React, { Component } from 'react';
import moment from 'moment';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Input,
  InputGroup,
  Button,
  Text,
  Spinner
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';
import dismissKeyboard from 'dismissKeyboard';

import {
  SIGNED_USER_STATUS
} from '../../../reducers/user/reducer.js';
import ErrorMessage from '../../../components/ErrorMessage.js';
import textErrorStyle from '../../../styles/textError.js';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment_body: '',
      comment_bodyValid: false,
      comment_bodyValidationMessage: ''
    };

    this.handleFormSubmit = this._handleFormSubmit.bind(this);
    this.handleNavigateSignIn = this._handleNavigateSignIn.bind(this);
    this.handleNavigateSignUp = this._handleNavigateSignUp.bind(this);
    this.validateCommentBody = this._validateCommentBody.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleFormSubmit() {
    dismissKeyboard();
    const comment_body = this.state.comment_body.trim();

    if(!this.validateCommentBody()) {
      return;
    }

    this.props.onCommentSubmit({
      user_id: this.props.user.get('user_id'),
      user_first_name: this.props.user.get('user_first_name'),
      user_last_name: this.props.user.get('user_last_name'),
      comment_body: comment_body,
      creation_date: moment().format()
    });

    this.setState({
      comment_body: ''
    });
  }

  _validateCommentBody() {
    const commentValue = this.state.comment_body.trim();
    const isValid = !!commentValue && commentValue.length <= 500;
    let validationMessage = '';

    if(!isValid) {
      if(commentValue.length === 0) {
        validationMessage = 'Escribe un comentario';
      }
      else if(commentValue.length > 500) {
        validationMessage = 'Los comentarios tienen un maximo de 500 caracteres';
      }
    }

    this.setState({
      comment_bodyValid: isValid,
      comment_bodyValidationMessage: validationMessage
    });

    return isValid;
  }

  _handleNavigateSignIn() {
    this.props.onNavigateSignIn();
  }

  _handleNavigateSignUp() {
    this.props.onNavigateSignUp();
  }

  render() {
    let showCommentError = !this.state.comment_bodyValid && !!this.state.comment_bodyValidationMessage;
    const commentInputGroupProps = {
      error: showCommentError
    };

    return(
      this.props.user.get('status') === SIGNED_USER_STATUS ?
        <View style={styles.container}>
          <InputGroup {...commentInputGroupProps}>
            <Input
              style={showCommentError && textErrorStyle}
              value={this.state.comment_body}
              onChangeText={(comment_body) => this.setState({comment_body})}
              placeholder='Comentario' />
          </InputGroup>
          <ErrorMessage showMessage={showCommentError}>
            {this.state.comment_bodyValidationMessage}
          </ErrorMessage>
          <View style={styles.buttonContainer}>
            {this.props.isSubmitingComment ?
              <Spinner color='blue' /> :
              <Button
                style={styles.button}
                onPress={this.handleFormSubmit}>
                Comentar
              </Button>}
          </View>
        </View> :
        <View style={styles.container}>
          <Text>Debes estar registrado para poder comentar</Text>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={this.handleNavigateSignIn}>
              Ingresar
            </Button>
            <Button
              style={styles.button}
              onPress={this.handleNavigateSignUp}>
              Registrarse
            </Button>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 5,
    padding: 10,

    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    marginTop: 5,
    marginRight: 5
  }
});

export default CommentForm;
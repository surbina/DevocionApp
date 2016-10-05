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
import {
  SIGNED_USER_STATUS
} from '../../../reducers/user/reducer.js';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment_body: ''
    };

    this.handleFormSubmit = this._handleFormSubmit.bind(this);
    this.handleNavigateSignIn = this._handleNavigateSignIn.bind(this);
    this.handleNavigateSignUp = this._handleNavigateSignUp.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleFormSubmit() {
    const comment_body = this.state.comment_body.trim();

    if(!comment_body) {
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

  _handleNavigateSignIn() {
    this.props.onNavigateSignIn();
  }

  _handleNavigateSignUp() {
    this.props.onNavigateSignUp();
  }

  render() {
    return(
      this.props.user.get('status') === SIGNED_USER_STATUS ?
        <View style={styles.container}>
          <InputGroup>
            <Input
              value={this.state.comment_body}
              onChangeText={(comment_body) => this.setState({comment_body})}
              placeholder='Comentario' />
          </InputGroup>
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
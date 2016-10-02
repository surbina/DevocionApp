import React, { Component } from 'react';
import moment from 'moment';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Input,
  InputGroup,
  Button
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment_body: ''
    };

    this.handleFormSubmit = this._handleFormSubmit.bind(this);
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
  }

  render() {
    return(
      <View style={styles.container}>
        <InputGroup>
          <Input
            onChangeText={(comment_body) => this.setState({comment_body})}
            placeholder='Comentario' />
        </InputGroup>
        <Button
          style={styles.button}
          onPress={this.handleFormSubmit}>
          Comentar
        </Button>
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
    marginBottom: 5
  },
  button: {
    alignSelf: 'center',
    marginTop: 5
  }
});

export default CommentForm;
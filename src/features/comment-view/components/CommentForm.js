import React, { Component } from 'react';
import moment from 'moment';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
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
      <View>
        <Text>Comment Form!</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(comment_body) => this.setState({comment_body})}
          placeholder="Comentario"
        />
        <TouchableHighlight
          onPress={this.handleFormSubmit}
          style={styles.buttonPrev} >
            <Text>GUARDAR COMENTARIO</Text>
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

export default CommentForm;
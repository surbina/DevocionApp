import React, { Component } from 'react';

import {
  Text,
  View
} from 'react-native';

class CommentItem extends Component {
  render() {
    return(
      <View>
        <Text>Author: {this.props.comment.get('user_first_name')}</Text>
        <Text>Comment: {this.props.comment.get('comment_body')}</Text>
      </View>
    );
  }
}

export default CommentItem;
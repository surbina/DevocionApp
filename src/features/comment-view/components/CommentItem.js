import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

class CommentItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  
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
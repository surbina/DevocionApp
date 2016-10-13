import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

import CommentItem from './CommentItem.js';

class CommentList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  
  render() {
    return(
      <View>
        {this.props.comments.map(comment => 
          <CommentItem
            key={comment.get('id')}
            comment={comment} />
        )}
      </View>
    );
  }
}

export default CommentList;
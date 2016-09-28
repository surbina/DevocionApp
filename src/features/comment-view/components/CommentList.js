import React, { Component } from 'react';
import {
  Text,
  ScrollView
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

import CommentItem from './CommentItem.js';

class CommentList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  
  render() {
    return(
      <ScrollView>
        {this.props.comments.valueSeq().map(comment => 
          <CommentItem
            key={comment.get('id')}
            comment={comment} />
        )}
      </ScrollView>
    );
  }
}

export default CommentList;
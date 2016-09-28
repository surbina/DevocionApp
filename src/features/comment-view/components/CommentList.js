import React, { Component } from 'react';

import {
  Text,
  ScrollView
} from 'react-native';

import CommentItem from './CommentItem.js';

class CommentList extends Component {
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
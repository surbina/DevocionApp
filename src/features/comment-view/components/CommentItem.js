import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Text
} from 'native-base';
import moment from 'moment';
import shallowCompare from 'react-addons-shallow-compare';

class CommentItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  
  render() {
    return(
      <View style={styles.commentContainer}>
        <Text>
          <Text style={styles.userName}>{this.props.comment.get('user_first_name')} {this.props.comment.get('user_last_name')}</Text> <Text style={styles.date}>{moment(this.props.comment.get('creation_date')).format('LL')}</Text>
        </Text>
        <Text style={styles.commentBody}>{this.props.comment.get('comment_body')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  commentContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#BBB',
    paddingBottom: 3,
    marginBottom: 5
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 12
  },
  commentBody: {
    fontSize: 12
  },
  date: {
    fontSize: 8
  }
});

export default CommentItem;
import React, { Component } from 'react';
import moment from 'moment';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Text,
  Spinner,
  Button
} from 'native-base';

import shallowCompare from 'react-addons-shallow-compare';

class DevotionalContent extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      !!this.props.devotional ?
        <View>
          <View style={[styles.centerContent, styles.row]}>
            <Text style={styles.textTitle}>{this.props.devotional.get('title')}</Text>
          </View>
          <View style={[styles.centerContent, styles.row]}>
            <Text>{this.props.devotional.get('author_name')}</Text>
          </View>
          <View style={[styles.centerContent, styles.row]}>
            <Text>{this.props.devotional.get('passage')} - {moment(this.props.devotional.get('publish_date')).format('LL')}</Text>
          </View>
          <View style={styles.row}>
            <Text>{this.props.devotional.get('body')}</Text>
          </View>
        </View> :
        <Spinner color='blue' />
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 5
  },
  centerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 20
  },
  textAuthor: {
    fontSize: 14
  },
  textPassage: {
    fontSize: 18
  }
});

export default DevotionalContent;

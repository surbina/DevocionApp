import React, { Component } from 'react';
import moment from 'moment';
import {
  Animated,
  View,
  StyleSheet
} from 'react-native';
import {
  Text,
  Spinner
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';
import HTMLView from 'react-native-htmlview';

import {
  FOOTER_HEIGHT
} from './DevotionalFooter.js';

class DevotionalContent extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const marginBottom = this.props.scrollYOffset.interpolate({
      inputRange: [0, FOOTER_HEIGHT],
      outputRange: [FOOTER_HEIGHT, 0],
      extrapolate: 'clamp',
    });

    return (
      !!this.props.devotional ?
        <Animated.View style={{marginBottom: marginBottom}}>
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
            <Text>
              <HTMLView
                value={this.props.devotional.get('body')} />
            </Text>
          </View>
        </Animated.View> :
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

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';

class DevotionalContent extends Component {
  render() {
    return (
      !!this.props.devotional ?
        <ScrollView>
          <View>
            <Text>{this.props.devotional.get('title')}</Text>
          </View>
          <View>
            <Text>{this.props.devotional.get('author_name')}</Text>
          </View>
          <View>
            <Text>{this.props.devotional.get('passage')} - {this.props.devotional.get('publish_date')}</Text>
          </View>
          <View>
            <Text>{this.props.devotional.get('body')}</Text>
          </View>
        </ScrollView> :
        <View>
          <Text>Loading ...</Text>
        </View>
    );
  }
}

export default DevotionalContent;

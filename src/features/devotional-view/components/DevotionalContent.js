import React, { Component } from 'react';
import moment from 'moment';
import {
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

class DevotionalContent extends Component {
  _handlePreviousAction() {
    const prevDate = moment(this.props.devotional.get('publish_date')).subtract(1, 'days').format('YYYY-MM-DD')
    this.props.onPreviousAction(prevDate);
  }

  _handleNextAction() {
    const nextDate = moment(this.props.devotional.get('publish_date')).add(1, 'days').format('YYYY-MM-DD');
    this.props.onNextAction(nextDate);
  }

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
          <View>
            <TouchableHighlight
              onPress={this._handlePreviousAction.bind(this)}
              style={styles.buttonPrev} >
                <Text>PREV</Text>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
              onPress={this._handleNextAction.bind(this)}
              style={styles.buttonNext} >
                <Text>NEXT</Text>
            </TouchableHighlight>
          </View>
        </ScrollView> :
        <View>
          <Text>Loading ...</Text>
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
  },
  buttonNext: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    height: 100,
    backgroundColor: 'blue'
  }
});

export default DevotionalContent;

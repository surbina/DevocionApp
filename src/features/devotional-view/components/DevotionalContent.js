import React, { Component } from 'react';
import moment from 'moment';
import {
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

class DevotionalContent extends Component {
  constructor(props) {
    super(props);

    this.handlePreviousAction = this._handlePreviousAction.bind(this);
    this.handleNextAction = this._handleNextAction.bind(this);
    this.handleViewCommentsAction = this._handleViewCommentsAction.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handlePreviousAction() {
    const prevDate = moment(this.props.devotional.get('publish_date')).subtract(1, 'days').format('YYYY-MM-DD')
    this.props.onPreviousAction(prevDate);
  }

  _handleNextAction() {
    const nextDate = moment(this.props.devotional.get('publish_date')).add(1, 'days').format('YYYY-MM-DD');
    this.props.onNextAction(nextDate);
  }

  _handleViewCommentsAction() {
    this.props.onViewCommentsAction();
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
              onPress={this.handlePreviousAction}
              style={styles.buttonPrev} >
                <Text>PREV</Text>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
              onPress={this.handleNextAction}
              style={styles.buttonNext} >
                <Text>NEXT</Text>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
              onPress={this.handleViewCommentsAction}
              style={styles.buttonView} >
                <Text>VIEW COMMENTS</Text>
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
  },
  buttonView: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    height: 100,
    backgroundColor: 'green'
  }
});

export default DevotionalContent;

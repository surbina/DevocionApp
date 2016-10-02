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
        <View style={styles.mainContainer}>
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
          <View style={styles.buttonContainer}>
            <Button onPress={this.handlePreviousAction}>
              Anterior
            </Button>
            <Button onPress={this.handleViewCommentsAction}>
              Ver Comentarios
            </Button>
            <Button onPress={this.handleNextAction}>
              Siguiente
            </Button>
          </View>
        </View> :
        <Spinner color='blue' />
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 30,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
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

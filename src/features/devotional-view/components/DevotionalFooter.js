import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Button
} from 'native-base';

class DevotionalFooter extends Component {
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
    return(
      <View style={styles.container}>
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
    );
  }
}

const buttonHeight = 38;
const padding = 5;

const styles = StyleSheet.create({
  container: {
    height: buttonHeight + 2 * padding,
    padding: padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',

    borderTopWidth: 1,
    borderTopColor: '#DDD'
  }
});

export default DevotionalFooter;
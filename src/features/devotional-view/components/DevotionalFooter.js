import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import {
  Animated,
  StyleSheet
} from 'react-native';

import FooterButton from './FooterButton.js';

export const BUTTOM_HEIGHT = 50;
export const PADDING = 5;
export const PADDING_TOP_BOTTOM = 10;
export const BORDER_TOP_WIDTH = 1;
export const FOOTER_HEIGHT = BUTTOM_HEIGHT + 2 * PADDING_TOP_BOTTOM + BORDER_TOP_WIDTH;

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
    const bottom = this.props.scrollYOffset.interpolate({
      inputRange: [0, FOOTER_HEIGHT],
      outputRange: [0, -FOOTER_HEIGHT],
      extrapolate: 'clamp',
    });

    return(
      <Animated.View style={[styles.container, {bottom: bottom}]}>
        <FooterButton
          iconName='md-arrow-back'
          onPress={this.handlePreviousAction}>
          Anterior
        </FooterButton>

        <FooterButton
          iconName='md-chatbubbles'
          onPress={this.handleViewCommentsAction}>
          Comentarios
        </FooterButton>

        <FooterButton
          iconName='md-arrow-forward'
          onPress={this.handleNextAction}>
          Siguiente
        </FooterButton>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: PADDING,
    paddingTop: PADDING_TOP_BOTTOM,
    paddingBottom: PADDING_TOP_BOTTOM,
    borderTopWidth: BORDER_TOP_WIDTH,
    borderTopColor: '#DDD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  }
});

export default DevotionalFooter;
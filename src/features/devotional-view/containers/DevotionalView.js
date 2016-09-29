import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Text,
  View
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

import { DrawerContainer } from '../../../components/drawer/Drawer.js';
import DevotionalContent from '../components/DevotionalContent.js';

import {
  loadCurrentOrPreviousDevotionalAction,
  loadCurrentOrNextDevotionalAction
} from '../../../reducers/devotional_view_section/actions.js';

import {
  LOADING_DEVOTIONAL_STATUS
} from '../../../reducers/devotional_view_section/reducer.js';

import {
  COMMENT_VIEW_ROUTE_INDEX,
  DEVOTIONAL_NOT_FOUND_VIEW_ROUTE_INDEX
} from '../../../Navigation.js';;

class DevotionalView extends Component {
  constructor(props) {
    super(props);

    this.onPreviousDevotional = this._onPreviousDevotional.bind(this);
    this.onNextDevotional = this._onNextDevotional.bind(this);
    this.onViewComments = this._onViewComments.bind(this);
    this.onDevotionalNotFound = this._onDevotionalNotFound.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillMount() {
    const devotionalDate = !!this.props.params && this.props.params.devotionalDate ?
      this.props.params.devotionalDate :
      moment().format('YYYY-MM-DD');

    this.onPreviousDevotional(devotionalDate);
  }

  _onPreviousDevotional(devotionalDate) {
    this.props.dispatch(loadCurrentOrPreviousDevotionalAction(devotionalDate, this.onDevotionalNotFound));
  }

  _onNextDevotional(devotionalDate) {
    this.props.dispatch(loadCurrentOrNextDevotionalAction(devotionalDate, this.onDevotionalNotFound));
  }

  _onViewComments() {
    this.props.navigator.push({index: COMMENT_VIEW_ROUTE_INDEX, params: {}});
  }

  _onDevotionalNotFound() {
    this.props.navigator.replaceAtIndex({index: DEVOTIONAL_NOT_FOUND_VIEW_ROUTE_INDEX}, 0);
  }

  render() {
    return (
      this.props.loadingDevotional ?
      <View>
        <Text>Loading ...</Text>
      </View> :
      <DrawerContainer navigator={this.props.navigator}>
        <DevotionalContent
          devotional={this.props.devotional}
          onPreviousAction={this.onPreviousDevotional}
          onNextAction={this.onNextDevotional}
          onViewCommentsAction={this.onViewComments} />
      </DrawerContainer>
    );
  }
}

function mapStateToProps(state) {
  const currentDevotionalPublishDate = state.devotional_view_section.get('current_devotional_publish_date');
  return {
    devotional: state.devotional_list.get(currentDevotionalPublishDate),
    loadingDevotional: state.devotional_view_section.get('status') === LOADING_DEVOTIONAL_STATUS
  };
}

export const DevotionalViewContainer = connect(mapStateToProps)(DevotionalView);

export default DevotionalView;

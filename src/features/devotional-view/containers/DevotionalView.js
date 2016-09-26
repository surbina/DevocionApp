import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Text,
  View
} from 'react-native';

import Drawer from '../../../components/drawer/Drawer.js';
import DevotionalContent from '../components/DevotionalContent.js';

import {
  loadCurrentOrPreviousDevotionalAction,
  loadCurrentOrNextDevotionalAction
} from '../../../reducers/devotional_view_section/actions.js';

import {
  LOADING_DEVOTIONAL_STATUS
} from '../../../reducers/devotional_view_section/reducer.js';


class DevotionalView extends Component {
  componentWillMount() {
    const devotionalDate = !!this.props.params && this.props.params.devotionalDate ?
      this.props.params.devotionalDate :
      moment().format('YYYY-MM-DD');

    this.props.dispatch(loadCurrentOrPreviousDevotionalAction(devotionalDate));
  }

  _onPreviousDevotional(devotionalDate) {
    this.props.dispatch(loadCurrentOrPreviousDevotionalAction(devotionalDate));
  }

  _onNextDevotional(devotionalDate) {
    this.props.dispatch(loadCurrentOrNextDevotionalAction(devotionalDate));
  }

  render() {
    return (
      this.props.loadingDevotional ?
      <View>
        <Text>Loading ...</Text>
      </View> :
      <Drawer navigator={this.props.navigator}>
        <DevotionalContent
          devotional={this.props.devotional}
          onPreviousAction={this._onPreviousDevotional.bind(this)}
          onNextAction={this._onNextDevotional.bind(this)} />
      </Drawer>
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

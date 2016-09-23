import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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
    this.props.dispatch(loadCurrentOrPreviousDevotionalAction(moment().format('YYYY-MM-DD')));
  }

  render() {
    return (
      <Drawer navigator={this.props.navigator}>
        <DevotionalContent  devotional={this.props.devotional} />
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

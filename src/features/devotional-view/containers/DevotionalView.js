import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

import Drawer from '../../../components/drawer/Drawer.js'

import {
  initAction,
  fetchFirebaseAction
} from '../../../reducers/app/actions.js'

class DevotionalView extends Component {
  componentWillMount() {
    this.props.dispatch(initAction());
    this.props.dispatch(fetchFirebaseAction());
  }

  render() {
    return (
      <Drawer navigator={this.props.navigator}>
        <View>
          <Text>
            DevotionalView!5 {this.props.currentStatus}
          </Text>
          {!!this.props.devotional ?
            <Text>
              Firebase test:{this.props.devotional.get('title')}
            </Text> :
            false}
        </View>
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentStatus: state.app.get('status'),
    devotional: state.app.get('devotional')
  };
}

export const DevotionalViewContainer = connect(mapStateToProps)(DevotionalView);

export default DevotionalView;

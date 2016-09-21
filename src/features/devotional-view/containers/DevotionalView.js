import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

import Drawer from '../../../components/drawer/Drawer.js'

import { initAction } from '../../../reducers/app/actions.js'

class DevotionalView extends Component {
  componentWillMount() {
    this.props.dispatch(initAction());
  }

  render() {
    return (
      <Drawer navigator={this.props.navigator}>
        <View>
          <Text>
            DevotionalView!5 {this.props.currentStatus}
          </Text>
        </View>
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentStatus: state.app.get('status')
  };
}

export const DevotionalViewContainer = connect(mapStateToProps)(DevotionalView);

export default DevotionalView;

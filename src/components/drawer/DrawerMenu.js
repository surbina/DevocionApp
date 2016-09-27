import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

import {
  DEVOTIONAL_VIEW_ROUTE_INDEX,
  CALENDAR_VIEW_ROUTE_INDEX,
  SIGN_IN_ROUTE_INDEX,
  SIGN_UP_ROUTE_INDEX
} from '../../Navigation.js';

import { signOutAction } from '../../reducers/user/actions.js';

class DrawerMenu extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      dataSource: ds.cloneWithRows([
        {title: 'Devotional View', action: this._navigateToRoute.bind(this, DEVOTIONAL_VIEW_ROUTE_INDEX, {})},
        {title: 'Calendar View', action: this._navigateToRoute.bind(this, CALENDAR_VIEW_ROUTE_INDEX)},
        {title: 'Sign In', action: this._navigateToRoute.bind(this, SIGN_IN_ROUTE_INDEX)},
        {title: 'Sign Up', action: this._navigateToRoute.bind(this, SIGN_UP_ROUTE_INDEX)},
        {title: 'Sign Out', action: this._dispatchAction.bind(this, signOutAction)},
      ])
    };

    this._renderMenuItem = this._renderMenuItem.bind(this);
  }

  _renderMenuItem(item) {
    return(
      <TouchableHighlight
        style={{height: 50}}
        activeOpacity={0.6}
        underlayColor={'white'}
        onPress={item.action}>
        <Text>{item.title}</Text>
      </TouchableHighlight>
    );
  }

  _navigateToRoute(index, params) {
    this.props.navigator.replaceAtIndex({ index, params }, 0);
  }

  _dispatchAction(action) {
    this.props.dispatch(action());
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer1!</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderMenuItem}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export const DrawerMenuContainer = connect(mapStateToProps)(DrawerMenu);

export default DrawerMenu;
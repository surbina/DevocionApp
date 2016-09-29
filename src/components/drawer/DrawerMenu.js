import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

import {
  DEVOTIONAL_VIEW_ROUTE_INDEX,
  CALENDAR_VIEW_ROUTE_INDEX,
  SIGN_IN_ROUTE_INDEX,
  SIGN_UP_ROUTE_INDEX,
  RESET_PASSWORD_ROUTE_INDEX
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
        {title: 'Devotional View', action: this._handleNavigateToRoute.bind(this, DEVOTIONAL_VIEW_ROUTE_INDEX, {})},
        {title: 'Calendar View', action: this._handleNavigateToRoute.bind(this, CALENDAR_VIEW_ROUTE_INDEX)},
        {title: 'Sign In', action: this._handleNavigateToRoute.bind(this, SIGN_IN_ROUTE_INDEX)},
        {title: 'Sign Up', action: this._handleNavigateToRoute.bind(this, SIGN_UP_ROUTE_INDEX)},
        {title: 'Reset Password', action: this._handleNavigateToRoute.bind(this, RESET_PASSWORD_ROUTE_INDEX)},
        {title: 'Sign Out', action: this._handleDispatchAction.bind(this, signOutAction)},
      ])
    };

    this.renderMenuItem = this._renderMenuItem.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
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

  _handleNavigateToRoute(index, params) {
    this.props.onNavigateToRoute(index, params);
  }

  _handleDispatchAction(action) {
    this.props.onDispatchAction(action);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Nombre: {this.props.user.get('user_first_name') || 'ANONIMO'}</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMenuItem}
        />
      </View>
    );
  }
}

export default DrawerMenu;
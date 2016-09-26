import React, { Component } from 'react';

import {
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

import {
  DEVOTIONAL_VIEW_ROUTE_INDEX,
  CALENDAR_VIEW_ROUTE_INDEX,
  SIGN_IN_ROUTE_INDEX
} from '../../Navigation.js';

class DrawerMenu extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      dataSource: ds.cloneWithRows([
        {title: 'Devotional View', index: DEVOTIONAL_VIEW_ROUTE_INDEX, params: {}},
        {title: 'Calendar View', index: CALENDAR_VIEW_ROUTE_INDEX},
        {title: 'Sign In', index: SIGN_IN_ROUTE_INDEX},
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
        onPress={this._onPressButton.bind(this, item)}>
        <Text>{item.title}</Text>
      </TouchableHighlight>
    );
  }

  _onPressButton(item) {
    this.props.navigator.replaceAtIndex(item, 0);
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

export default DrawerMenu;
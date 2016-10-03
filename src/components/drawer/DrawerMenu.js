import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

import {
  List,
  ListItem,
  Text
} from 'native-base';

import shallowCompare from 'react-addons-shallow-compare';

import {
  DEVOTIONAL_VIEW_ROUTE_INDEX,
  CALENDAR_VIEW_ROUTE_INDEX,
  SIGN_IN_ROUTE_INDEX,
  SIGN_UP_ROUTE_INDEX,
  RESET_PASSWORD_ROUTE_INDEX
} from '../../Navigation.js';

import {
  ANONYMOUS_USER_STATUS,
  SIGNED_USER_STATUS
} from '../../reducers/user/reducer.js';

import { signOutAction } from '../../reducers/user/actions.js';

class DrawerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsCommonSections: [
        {title: 'Devotional View', action: this._handleNavigateToRoute.bind(this, DEVOTIONAL_VIEW_ROUTE_INDEX, {})},
        {title: 'Calendar View', action: this._handleNavigateToRoute.bind(this, CALENDAR_VIEW_ROUTE_INDEX)}
      ],
      itemsAnonymousUser: [
        {title: 'Sign In', action: this._handleNavigateToRoute.bind(this, SIGN_IN_ROUTE_INDEX)},
        {title: 'Sign Up', action: this._handleNavigateToRoute.bind(this, SIGN_UP_ROUTE_INDEX)},
        {title: 'Reset Password', action: this._handleNavigateToRoute.bind(this, RESET_PASSWORD_ROUTE_INDEX)}
      ],
      itemsLoggedUser: [
        {title: 'Salir', action: this._handleDispatchAction.bind(this, signOutAction)}
      ]
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleNavigateToRoute(index, params) {
    this.props.onNavigateToRoute(index, params);
  }

  _handleDispatchAction(action) {
    this.props.onDispatchAction(action);
  }

  _renderRow(item) {
    return(
      <ListItem button onPress={item.action}>
        <Text>{item.title}</Text>
      </ListItem>
    );
  }

  render() {
    let navigationItems;

    if(this.props.user.get('status') === ANONYMOUS_USER_STATUS) {
      navigationItems = this.state.itemsCommonSections.concat(this.state.itemsAnonymousUser);
    }
    else if(this.props.user.get('status') === SIGNED_USER_STATUS) {
      navigationItems = this.state.itemsCommonSections.concat(this.state.itemsLoggedUser);
    }

    const userName = this.props.user.get('user_first_name') || 'Anonimo';
    const avatarChar = userName.charAt(0);

    return (
      <View style={styles.menuContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.userChar}>{avatarChar}</Text>
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <ScrollView style={styles.itemContainer}>
          <List
            dataArray={navigationItems}
            renderRow={this._renderRow} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  avatarContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#555'
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#7FFFD4',
    borderWidth: 2,
    borderColor: '#555',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userChar: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#555'
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  itemContainer: {
    flex: 7
  }
});

export default DrawerMenu;
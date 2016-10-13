import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  DrawerLayoutAndroid,
  Text,
  View
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

import DrawerMenu from './DrawerMenu.js'

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.renderDrawerMenu = this._renderDrawerMenu.bind(this);
    this.navigateToRoute = this._navigateToRoute.bind(this);
    this.dispatchAction = this._dispatchAction.bind(this);

    this.openDrawer = this._openDrawer.bind(this);
    this.closeDrawer = this._closeDrawer.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _renderDrawerMenu() {
    return(
      <DrawerMenu
        onNavigateToRoute={this.navigateToRoute}
        onDispatchAction={this.dispatchAction}
        user={this.props.user} />
    );
  }

  _navigateToRoute(index, params) {
    this.props.navigator.replaceAtIndex({ index, params }, 0);
  }

  _dispatchAction(action) {
    this.closeDrawer();
    this.props.dispatch(action());
  }

  _openDrawer() {
    this.drawer.openDrawer();
  }

  _closeDrawer() {
    this.drawer.closeDrawer();
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderDrawerMenu}
        ref={d => this.drawer = d}>
        
      { this.props.children }

      </DrawerLayoutAndroid>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export const DrawerContainer = connect(mapStateToProps, null, null, {withRef: true})(Drawer);

export default Drawer;

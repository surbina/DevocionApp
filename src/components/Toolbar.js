import React, { Component } from 'react';
import {
  View,
  ToolbarAndroid,
  StyleSheet
} from 'react-native';

class Toolbar extends ToolbarAndroid {
  constructor(props) {
    super(props);

    this.handleActionSelected = this._handleActionSelected.bind(this);
  }

  _handleActionSelected(position) {
    this.props.actions[position].action();
  }

  render() {
    return(
      <ToolbarAndroid
        actions={this.props.actions}
        style={styles.toolbar}
        subtitle={this.props.subtitle}
        subtitleColor='#CCC'
        title={this.props.title}
        titleColor='#FFF'
        onActionSelected={this.handleActionSelected} />
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#4179F7',
    height: 56,
  },
});

export default Toolbar;
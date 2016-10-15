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
        title={this.props.title}
        onActionSelected={this.handleActionSelected} />
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
});

export default Toolbar;
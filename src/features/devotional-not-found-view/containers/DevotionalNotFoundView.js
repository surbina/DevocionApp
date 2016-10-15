import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';

import {
  DEVOTIONAL_VIEW_ROUTE_INDEX
} from '../../../Navigation.js';

import AppContainer from '../../../components/AppContainer.js';
import contentStyle from '../../../styles/content.js';

class DevotionalNotFound extends Component {
  constructor(props) {
    super(props);
    this.handleNavigateDevotional = this._handleNavigateDevotional.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleNavigateDevotional() {
    this.props.navigator.replaceAtIndex({
      index: DEVOTIONAL_VIEW_ROUTE_INDEX,
      params: {}
    }, 0);
  }

  render() {
    return (
      <AppContainer
        title='Devocional no encontrado'
        navigator={this.props.navigator}>
        <Container>
          <Content style={contentStyle}>
            <Text>No hemos encontrado un devocional para esa fecha.</Text>
            <Button
              style={styles.button}
              onPress={this.handleNavigateDevotional}>
              Volver a Devocionales
            </Button>
          </Content>
        </Container>
      </AppContainer>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginTop: 5
  }
});

export default DevotionalNotFound;

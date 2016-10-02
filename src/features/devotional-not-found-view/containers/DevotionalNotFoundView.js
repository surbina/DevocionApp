import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Text
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';

import { DrawerContainer } from '../../../components/drawer/Drawer.js'
import commonStyles from '../../../commonStyles.js';

class DevotionalNotFound extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  
  render() {
    return (
      <DrawerContainer navigator={this.props.navigator}>
        <Container>
          <Header>
            <Title>Devocional no encontrado</Title>
          </Header>
          <Content style={commonStyles.content}>
            <Text>No hemos encontrado un devocional para esa fecha.</Text>
          </Content>
        </Container>
      </DrawerContainer>
    );
  }
}

export default DevotionalNotFound;

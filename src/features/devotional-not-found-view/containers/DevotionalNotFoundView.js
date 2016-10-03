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
import contentStyle from '../../../styles/content.js';

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
          <Content style={contentStyle}>
            <Text>No hemos encontrado un devocional para esa fecha.</Text>
          </Content>
        </Container>
      </DrawerContainer>
    );
  }
}

export default DevotionalNotFound;

import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';

import { DrawerContainer } from '../../../components/drawer/Drawer.js'
import contentStyle from '../../../styles/content.js';

class DevotionalNotFound extends Component {
  constructor(props) {
    super(props);

    this.handleOpenDrawer = this._handleOpenDrawer.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  
  _handleOpenDrawer() {
    this.drawer.getWrappedInstance().openDrawer();
  }

  render() {
    return (
      <DrawerContainer
        navigator={this.props.navigator}
        ref={d => this.drawer = d}>
        <Container>
          <Header>
            <Button
              transparent
              onPress={this.handleOpenDrawer}>
              <Icon name='ios-menu' />
            </Button>
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

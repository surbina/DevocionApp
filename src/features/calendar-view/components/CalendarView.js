import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';

import contentStyle from '../../../styles/content.js';
import { DrawerContainer } from '../../../components/drawer/Drawer.js'

class CalendarView extends Component {
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
        ref={d => this.drawer = d}
        navigator={this.props.navigator}>
        <Container>
          <Header>
            <Button
              transparent
              onPress={this.handleOpenDrawer}>
              <Icon name='ios-menu' />
            </Button>
            <Title>Calendario</Title>
          </Header>
          <Content style={contentStyle} >
            <Text>Aca va el calendario</Text>
          </Content>
        </Container>
      </DrawerContainer>
    );
  }
}

export default CalendarView;

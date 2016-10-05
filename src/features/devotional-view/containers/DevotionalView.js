import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Container,
  Header,
  Title,
  Content,
  Spinner,
  Button,
  Icon
} from 'native-base';
import _ from 'lodash';
import shallowCompare from 'react-addons-shallow-compare';

import { DrawerContainer } from '../../../components/drawer/Drawer.js';
import DevotionalContent from '../components/DevotionalContent.js';
import contentStyle from '../../../styles/content.js';

import {
  loadCurrentOrPreviousDevotionalAction,
  loadCurrentOrNextDevotionalAction
} from '../../../reducers/devotional_view_section/actions.js';

import {
  LOADING_DEVOTIONAL_STATUS
} from '../../../reducers/devotional_view_section/reducer.js';

import {
  COMMENT_VIEW_ROUTE_INDEX,
  DEVOTIONAL_NOT_FOUND_VIEW_ROUTE_INDEX
} from '../../../Navigation.js';;

class DevotionalView extends Component {
  constructor(props) {
    super(props);

    this.onPreviousDevotional = this._onPreviousDevotional.bind(this);
    this.onNextDevotional = this._onNextDevotional.bind(this);
    this.onViewComments = this._onViewComments.bind(this);
    this.onDevotionalNotFound = this._onDevotionalNotFound.bind(this);

    this.handleOpenDrawer = this._handleOpenDrawer.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillMount() {
    const devotionalDate = !!this.props.params && this.props.params.devotionalDate ?
      this.props.params.devotionalDate :
      moment().format('YYYY-MM-DD');

    this.props.dispatch(loadCurrentOrPreviousDevotionalAction(devotionalDate, this.onDevotionalNotFound));
  }

  _onPreviousDevotional(devotionalDate) {
    this.props.dispatch(loadCurrentOrPreviousDevotionalAction(devotionalDate, this.onDevotionalNotFound));
    this._content._scrollview.scrollToPosition(0, 0, true);
  }

  _onNextDevotional(devotionalDate) {
    this.props.dispatch(loadCurrentOrNextDevotionalAction(devotionalDate, this.onDevotionalNotFound));
    this._content._scrollview.scrollToPosition(0, 0, true);
  }

  _onViewComments() {
    this.props.navigator.push({index: COMMENT_VIEW_ROUTE_INDEX, params: {}});
  }

  _onDevotionalNotFound() {
    this.props.navigator.replaceAtIndex({index: DEVOTIONAL_NOT_FOUND_VIEW_ROUTE_INDEX}, 0);
  }

  _handleOpenDrawer() {
    console.log('this.drawerContainer.shouldComponentUpdate: ', this.drawerContainer.shouldComponentUpdate);
    console.log('this.drawerContainer.shouldComponentUpdate(): ', this.drawerContainer.shouldComponentUpdate());
    console.log('this.drawerContainer.openDrawer: ', this.drawerContainer.openDrawer);
    console.log('this.drawerContainer._openDrawer: ', this.drawerContainer._openDrawer);
    console.log('this.drawerContainer.renderDrawerMenu: ', this.drawerContainer.renderDrawerMenu);
    console.log('this.drawerContainer.pepe: ', this.drawerContainer.pepe);
    debugger;
    this.drawerContainer.openDrawer();
  }

  render() {
    return (
      <DrawerContainer
        navigator={this.props.navigator}
        ref={assignDrawer.bind(this)}>

        <Container> 
          <Header>
            <Button
              transparent
              onPress={this.handleOpenDrawer}>
              <Icon name='ios-menu' />
            </Button>
            <Title>Devocional</Title>
          </Header>
          <Content
            style={contentStyle}
            ref={c => this._content = c}>
            {this.props.loadingDevotional ?
              <Spinner color='blue' /> :
              <DevotionalContent
                devotional={this.props.devotional}
                onPreviousAction={this.onPreviousDevotional}
                onNextAction={this.onNextDevotional}
                onViewCommentsAction={this.onViewComments} />}
          </Content>
        </Container>

      </DrawerContainer>
    );
  }
}

function assignDrawer(d) {
  //ref={(d) => this.drawerContainer = d}
  if(d) {
    var a = _.clone(d);
    //delete a.props;
    //delete a.context;
    console.log('a: ', a.props);
    console.log('open: ', a.openDrawer);
  }

  this.drawerContainer = d
}

function mapStateToProps(state) {
  const currentDevotionalPublishDate = state.devotional_view_section.get('current_devotional_publish_date');
  return {
    devotional: state.devotional_list.get(currentDevotionalPublishDate),
    loadingDevotional: state.devotional_view_section.get('status') === LOADING_DEVOTIONAL_STATUS
  };
}

export const DevotionalViewContainer = connect(mapStateToProps)(DevotionalView);

export default DevotionalView;

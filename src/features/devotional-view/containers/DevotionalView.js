import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Animated
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Spinner,
  Button,
  Icon
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';

import { DrawerContainer } from '../../../components/drawer/Drawer.js';
import DevotionalContent from '../components/DevotionalContent.js';
import DevotionalFooter from '../components/DevotionalFooter.js';
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

    this.state = {
      scrollY: new Animated.Value(0),
    };
    this.handleScroll = Animated.event([{
      nativeEvent: {
        contentOffset: {
          y: this.state.scrollY
        }
      }
    }]);
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
            <Title>Devocional</Title>
          </Header>
          <Content
            ref={c => this._content = c}
            style={contentStyle}
            onScroll={this.handleScroll}>
            {this.props.loadingDevotional ?
              <Spinner color='blue' /> :
              <DevotionalContent
                devotional={this.props.devotional}
                scrollYOffset={this.state.scrollY} />}
          </Content>
        </Container>
        {this.props.loadingDevotional ?
          false :
          <DevotionalFooter
            devotional={this.props.devotional}
            onPreviousAction={this.onPreviousDevotional}
            onNextAction={this.onNextDevotional}
            onViewCommentsAction={this.onViewComments}
            scrollYOffset={this.state.scrollY} />}
      </DrawerContainer>
    );
  }
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

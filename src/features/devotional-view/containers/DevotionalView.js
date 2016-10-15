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
import DateTimePicker from 'react-native-modal-datetime-picker';
import shallowCompare from 'react-addons-shallow-compare';

import Toolbar from '../../../components/Toolbar.js';
import AppContainer from '../../../components/AppContainer.js';
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
  signOutAction
} from '../../../reducers/user/actions.js';

import {
  SIGNED_USER_STATUS
} from '../../../reducers/user/reducer.js';

import {
  COMMENT_VIEW_ROUTE_INDEX,
  DEVOTIONAL_NOT_FOUND_VIEW_ROUTE_INDEX,
  SIGN_IN_ROUTE_INDEX,
  SIGN_UP_ROUTE_INDEX,
  RESET_PASSWORD_ROUTE_INDEX
} from '../../../Navigation.js';

class DevotionalView extends Component {
  constructor(props) {
    super(props);

    this.onPreviousDevotional = this._onPreviousDevotional.bind(this);
    this.onNextDevotional = this._onNextDevotional.bind(this);
    this.onViewComments = this._onViewComments.bind(this);
    this.onDevotionalNotFound = this._onDevotionalNotFound.bind(this);
    this.onConfirmDatePicked = this._onConfirmDatePicked.bind(this);
    this.onCancelDatePicked = this._onCancelDatePicked.bind(this);

    this.handleShowDatePicker = this._handleShowDatePicker.bind(this);
    this.handleHideDatePicker = this._handleHideDatePicker.bind(this);

    this.state = {
      scrollY: new Animated.Value(0),
      isDatePickerVisible: false
    };
    this.handleScroll = Animated.event([{
      nativeEvent: {
        contentOffset: {
          y: this.state.scrollY
        }
      }
    }]);

    this.anonymousUserActions = [{
      title: 'Ingresar',
      action: this._handleNavigateToRoute.bind(this, SIGN_IN_ROUTE_INDEX)
    }, {
      title: 'Registrarse',
      action: this._handleNavigateToRoute.bind(this, SIGN_UP_ROUTE_INDEX)
    }, {
      title: 'Reiniciar contraseña',
      action: this._handleNavigateToRoute.bind(this, RESET_PASSWORD_ROUTE_INDEX)
    }];

    this.signedInUserActions = [{
      title: 'Salir',
      action: this._handleDispatchAction.bind(this, signOutAction),
    }]
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

  _handleShowDatePicker() {
    this.setState({
      isDatePickerVisible: true
    });
  }

  _handleHideDatePicker() {
    this.setState({
      isDatePickerVisible: false
    });
  }

  _onConfirmDatePicked(date) {
    this.handleHideDatePicker();
    this.onPreviousDevotional(moment(date).format('YYYY-MM-DD'));
  }

  _onCancelDatePicked() {
    this.handleHideDatePicker();
  }

  _handleNavigateToRoute(index, params) {
    this.props.navigator.replaceAtIndex({ index, params }, 0);
  }

  _handleDispatchAction(action) {
    this.props.dispatch(action());
  }

  render() {
    let userName = '',
      actions = this.anonymousUserActions;

    if(this.props.user.get('status') === SIGNED_USER_STATUS) {
      userName = this.props.user.get('user_first_name');
      actions = this.signedInUserActions;
    }

    return (
      <AppContainer>
        <Toolbar
          title='DevocionApp'
          subtitle={userName}
          actions={actions} />
        <Container>
          <Content
            ref={c => this._content = c}
            style={contentStyle}
            onScroll={this.handleScroll}>
            {this.props.loadingDevotional ?
              <Spinner color='blue' /> :
              <DevotionalContent
                devotional={this.props.devotional}
                scrollYOffset={this.state.scrollY} />}
            <DateTimePicker
                isVisible={this.state.isDatePickerVisible}
                onConfirm={this.onConfirmDatePicked}
                onCancel={this.onCancelDatePicked}
              />
          </Content>
        </Container>
        {this.props.loadingDevotional ?
          false :
          <DevotionalFooter
            devotional={this.props.devotional}
            onPreviousAction={this.onPreviousDevotional}
            onNextAction={this.onNextDevotional}
            onViewCommentsAction={this.onViewComments}
            onShowCalendar={this.handleShowDatePicker}
            scrollYOffset={this.state.scrollY} />}
      </AppContainer>
    );
  }
}

function mapStateToProps(state) {
  const currentDevotionalPublishDate = state.devotional_view_section.get('current_devotional_publish_date');
  return {
    devotional: state.devotional_list.get(currentDevotionalPublishDate),
    loadingDevotional: state.devotional_view_section.get('status') === LOADING_DEVOTIONAL_STATUS,
    user: state.user
  };
}

export const DevotionalViewContainer = connect(mapStateToProps)(DevotionalView);

export default DevotionalView;

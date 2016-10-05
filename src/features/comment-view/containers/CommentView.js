import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
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

import {
  SIGN_IN_ROUTE_INDEX,
  SIGN_UP_ROUTE_INDEX
} from '../../../Navigation.js';

import contentStyle from '../../../styles/content.js';
import CommentForm from '../components/CommentForm.js';
import CommentList from '../components/CommentList.js';

import {
  fetchCommentListAction,
  postCommentAction
} from '../../../reducers/comment_list/actions.js';

class CommentView extends Component {
  constructor(props) {
    super(props);

    this.getComments = this._getComments.bind(this);
    this.handleCommentSubmit = this._handleCommentSubmit.bind(this);
    this.handleNavigateSignIn = this._handleNavigateSignIn.bind(this);
    this.handleNavigateSignUp = this._handleNavigateSignUp.bind(this);
    this.handleBackAction = this._handleBackAction.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidMount() {
    this.props.dispatch(fetchCommentListAction(this.props.devotionalId));
  }

  _getComments() {
    return this.props.comments || Map();
  }

  _handleCommentSubmit (comment) {
    this.props.dispatch(postCommentAction(this.props.devotionalId, comment));    
  }

  _handleNavigateSignIn() {
    this.props.navigator.pop();
    this.props.navigator.replaceAtIndex({
      index: SIGN_IN_ROUTE_INDEX,
      params: {}
    }, 0);
  }

  _handleNavigateSignUp() {
    this.props.navigator.pop();
    this.props.navigator.replaceAtIndex({
      index: SIGN_UP_ROUTE_INDEX,
      params: {}
    }, 0);
  }

  _handleBackAction() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <Container>
        <Header>
          <Button
            transparent
            onPress={this.handleBackAction}>
            <Icon name='ios-arrow-back' />
          </Button>
          <Title>Comentarios</Title>
        </Header>
        <Content style={contentStyle}>
          <CommentForm
            user={this.props.user}
            onCommentSubmit={this.handleCommentSubmit}
            onNavigateSignIn={this.handleNavigateSignIn}
            onNavigateSignUp={this.handleNavigateSignUp} />
          {this.getComments().size > 0 ?
              <CommentList comments={this.getComments()} />:
              <Text>Todavía no han comentado este devocional.</Text>}
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const devotionalId = state.devotional_view_section.get('current_devotional_id');
  return {
    user: state.user,
    devotionalId: devotionalId,
    comments: state.comment_list.get(devotionalId)
  };
}

export const CommentViewContainer = connect(mapStateToProps)(CommentView);

export default CommentView;

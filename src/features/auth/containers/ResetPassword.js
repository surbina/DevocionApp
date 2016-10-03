import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Title,
  Content
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';

import { DrawerContainer } from '../../../components/drawer/Drawer.js';
import ResetPasswordForm from '../components/ResetPasswordForm.js';
import { SENDING_RESET_PASSWORD_MAIL_STATUS } from '../../../reducers/user/reducer.js';
import { sendResetPasswordMailAction } from '../../../reducers/user/actions.js';
import contentStyle from '../../../styles/content.js';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleResetPasswordSubmit = this._handleResetPasswordSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleResetPasswordSubmit(email) {
    this.props.dispatch(sendResetPasswordMailAction(email));
  }

  render() {
    return (
      <DrawerContainer navigator={this.props.navigator}>
        <Container> 
          <Header>
            <Title>Reiniciar contraseña</Title>
          </Header>
          <Content
            style={contentStyle}
            contentContainerStyle={contentContainerStyle}>
            <ResetPasswordForm
              onResetPasswordSubmit={this.handleResetPasswordSubmit}
              isSendingResetPasswordMail={this.props.isSendingResetPasswordMail} />
          </Content>
        </Container>
      </DrawerContainer>
    );
  }
}

const contentContainerStyle = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

function mapStateToProps(state) {
  return {
    isSendingResetPasswordMail: state.user.get('status') === SENDING_RESET_PASSWORD_MAIL_STATUS
  };
}

export const ResetPasswordContainer = connect(mapStateToProps)(ResetPassword);

export default ResetPassword;

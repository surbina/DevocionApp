import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';
import dismissKeyboard from 'dismissKeyboard';

import AppContainer from '../../../components/AppContainer.js';
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
    const contentContainerStyle = {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
    
    return (
      <AppContainer
        title='Reiniciar contraseña'
        navigator={this.props.navigator}>
        <Container> 
          <Content
            style={contentStyle}
            contentContainerStyle={contentContainerStyle}
            keyboardShouldPersistTaps={true}>
            <ResetPasswordForm
              onResetPasswordSubmit={this.handleResetPasswordSubmit}
              isSendingResetPasswordMail={this.props.isSendingResetPasswordMail} />
          </Content>
        </Container>
      </AppContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSendingResetPasswordMail: state.user.get('status') === SENDING_RESET_PASSWORD_MAIL_STATUS
  };
}

export const ResetPasswordContainer = connect(mapStateToProps)(ResetPassword);

export default ResetPassword;

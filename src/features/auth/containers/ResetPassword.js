import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawer from '../../../components/drawer/Drawer.js';
import ResetPasswordForm from '../components/ResetPasswordForm.js';

import { SENDING_RESET_PASSWORD_MAIL_STATUS } from '../../../reducers/user/reducer.js';
import { sendResetPasswordMailAction } from '../../../reducers/user/actions.js';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleResetPasswordSubmit = this._handleResetPasswordSubmit.bind(this);
  }

  _handleResetPasswordSubmit(email) {
    this.props.dispatch(sendResetPasswordMailAction(email));
  }

  render() {
    return (
      <Drawer navigator={this.props.navigator}>
        <ResetPasswordForm
          onResetPasswordSubmit={this.handleResetPasswordSubmit}
          isSendingResetPasswordMail={this.props.isSendingResetPasswordMail} />
      </Drawer>
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

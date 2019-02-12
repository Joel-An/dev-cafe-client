import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { openLoginPopup as openLoginPopupAction } from '../../store/actions/popups';

class LoginButton extends React.Component {
  openPopup = () => {
    const { openLoginPopup } = this.props;
    const { x, y } = this.button.getBoundingClientRect();
    openLoginPopup({ pos: { x, y } });
  }

  render() {
    return (
      <button type="button" onClick={this.openPopup} ref={ (el) => { this.button = el; }}>
        LOGIN
      </button>
    );
  }
}

const mapDispatchToProps = { openLoginPopup: openLoginPopupAction };

export default connect(
  null,
  mapDispatchToProps,
)(LoginButton);

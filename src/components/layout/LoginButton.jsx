import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { openLoginPopup as openLoginPopupAction } from '../../store/actions/popups';

class LoginButton extends React.Component {
  openPopup = () => {
    const { openLoginPopup, afterLogin } = this.props;
    const {
      left, right, top,
    } = this.button.getBoundingClientRect();
    openLoginPopup({ pos: { left, right, top }, afterLogin });
  }

  render() {
    return (
      <button type="button" onClick={this.openPopup} ref={ (el) => { this.button = el; }}>
        LOGIN
      </button>
    );
  }
}

LoginButton.propTypes = {
  afterLogin: PropTypes.func,
  openLoginPopup: PropTypes.func.isRequired,
};

LoginButton.defaultProps = {
  afterLogin: undefined,
};

const mapDispatchToProps = { openLoginPopup: openLoginPopupAction };

export default connect(
  null,
  mapDispatchToProps,
)(LoginButton);

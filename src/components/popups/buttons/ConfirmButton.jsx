import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { openConfirm as openConfirmAction } from '../../../store/actions/popups';

class ConfirmButton extends React.Component {
  openPopup = () => {
    const {
      openConfirm, onConfirm, title, message,
    } = this.props;
    const {
      left, right, top,
    } = this.button.getBoundingClientRect();

    openConfirm({
      pos: {
        left, right, top,
      },
      onConfirm,
      title,
      message,
    });
  }

  render() {
    const { children } = this.props;
    return (
      <button type="button" onClick={this.openPopup} ref={ (el) => { this.button = el; }}>
        {children}
      </button>
    );
  }
}

const mapDispatchToProps = { openConfirm: openConfirmAction };

export default connect(
  null,
  mapDispatchToProps,
)(ConfirmButton);

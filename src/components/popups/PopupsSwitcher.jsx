import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { closePopup as closePopupAction } from '../../store/actions/popups';

import './PopupsSwitcher.scss';

class PopupSwitcher extends React.Component {
  componentDidMount() {
    document.body.addEventListener('keydown', this.closeLastPopup);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.closeLastPopup);
  }

  getAllPopups = () => {
    const { children } = this.props;

    return React.Children.toArray(children);
  }

  getVisiblePopups = () => {
    const { openedPopups, closePopup } = this.props;

    const allPopups = this.getAllPopups();

    const visiblePopups = openedPopups.map((entry) => {
      const { popupType, popupProps } = entry;

      const Element = allPopups.find(popup => popup.props.popupType === popupType);

      return React.cloneElement(Element, {
        close: () => closePopup(popupType),
        ...popupProps,
      });
    });

    return visiblePopups;
  }

  getLastPopup = () => {
    const { openedPopups } = this.props;
    const lastPopupInfo = openedPopups[openedPopups.length - 1];

    const { popupType: lastPopupType } = lastPopupInfo;

    const allPopups = this.getAllPopups();
    const lastPopup = allPopups.find(popup => popup.props.popupType === lastPopupType);

    return lastPopup;
  }

  closeLastPopup = (e) => {
    if ((e.key === 'Escape' || e.keyCode === 27)) {
      const lastPopup = this.getLastPopup();
      this.closeIfEscapable(lastPopup)();
    }
  }

  closeIfEscapable = popup => () => {
    const { closePopup } = this.props;

    if (popup && popup.props.escapable) {
      closePopup(popup.props.popupType);
    }
  }

  render() {
    const popups = this.getVisiblePopups();

    if (popups.length === 0) { return null; }

    return (
      <div className="PopupSwitcher">
        {popups.map(popup => (
          <div
            key={popup.props.popupType}
            className="popup-background"
            onClick={this.closeIfEscapable(popup)}
            role="presentation"
          >
            {popup}
          </div>
        ))}
      </div>
    );
  }
}

const popupPropType = PropTypes.shape({
  popupType: PropTypes.string.isRequired,
  popupProps: PropTypes.object,
});

PopupSwitcher.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  openedPopups: PropTypes.arrayOf(popupPropType),
  closePopup: PropTypes.func.isRequired,
};

PopupSwitcher.defaultProps = {
  openedPopups: [],
};

const mapStateToProps = (state) => {
  const openedPopups = state.popups;

  return { openedPopups };
};

const mapDispatchToProps = { closePopup: closePopupAction };

export default connect(mapStateToProps, mapDispatchToProps)(PopupSwitcher);

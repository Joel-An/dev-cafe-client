import React from 'react';

import './Popup.scss';

class Popup extends React.Component {
  onDialogClick = (event) => {
    event.stopPropagation();
  }

  render() {
    const {
      children, pos, close,
    } = this.props;

    const style = pos
      ? { position: 'absolute', top: pos.top, right: `calc(100% - ${pos.right}px)` }
      : {};

    return (
      <div className="Popup" style={style} onClick={this.onDialogClick} >
        <div className="popup-header">
          <button className="popup-close-button" type="button" onClick={close}>
            X
          </button>
        </div>
        <div className="popup-dialog">
          {children}
        </div>
      </div>
    );
  }
}

export default Popup;

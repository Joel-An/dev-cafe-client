import React from 'react';

import './Popup.scss';

class Popup extends React.Component {
  onDialogClick = (event) => {
    event.stopPropagation();
  }

  render() {
    const {
      children, style, close,
    } = this.props;
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

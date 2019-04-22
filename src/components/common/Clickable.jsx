import React from 'react';
import PropTypes from 'prop-types';

const style = { cursor: 'pointer' };

class Clickable extends React.Component {
  constructor(props) {
    super(props);
    this.isProcessing = false;
  }

  onClick = () => {
    const { handleClick, onSuccess, onFailure } = this.props;

    return handleClick()
      .then(onSuccess)
      .catch(onFailure)
      .finally(() => {
        this.isProcessing = false;
      });
  }

  render() {
    const { className, children } = this.props;

    return (
      <div role="button" tabIndex={0} className={className} onClick={this.onClick} style={style} >
        {children}
      </div>
    );
  }
}

export default Clickable;

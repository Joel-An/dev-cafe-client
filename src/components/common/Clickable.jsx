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

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.onClick();
    }
  }

  render() {
    const { className, children } = this.props;

    return (
      <div
        role="button"
        tabIndex={0}
        className={className}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        style={style} >
        {children}
      </div>
    );
  }
}

Clickable.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
};

Clickable.defaultProps = {
  className: '',
};

export default Clickable;

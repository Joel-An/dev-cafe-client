import React from 'react';
import PropTypes from 'prop-types';

const style = { cursor: 'pointer' };

class Clickable extends React.Component {
  constructor(props) {
    super(props);
    this.isProcessing = false;
  }

  onClick = (e) => {
    const { handleClick, onSuccess, onFailure } = this.props;

    if (this.isProcessing) {
      return null;
    }

    const result = handleClick(e);

    if (result instanceof Promise) {
      this.isProcessing = true;

      return result
        .then(onSuccess)
        .catch(onFailure)
        .finally(() => {
          this.isProcessing = false;
        });
    }
    return null;
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
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

Clickable.defaultProps = {
  className: '',
  onSuccess: () => {},
  onFailure: () => {},
};

export default Clickable;

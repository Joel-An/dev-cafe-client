import React from 'react';
import PropTypes from 'prop-types';

import './Hoverable.scss';

class Hoverable extends React.Component {
  constructor(props) {
    super(props);
    this.isProcessing = false;
    this.state = {
      hover: false,
    };
  }

  onMouseEnter = () => {
    const { delay } = this.props;
    this.isProcessing = setTimeout(() => this.setState({ hover: true }), delay || 500);
  }

  onMouseLeave = () => {
    const { hover } = this.state;
    if (!hover) {
      clearTimeout(this.isProcessing);
      this.isProcessing = false;
    }

    this.setState({ hover: false });
  }

  render() {
    const { className, children, hoverComponent } = this.props;
    const { hover } = this.state;
    return (
      <div
        className="hoverable"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {hover && <div className="on-hover">{hoverComponent}</div> }

        {children}
      </div>
    );
  }
}

export default Hoverable;

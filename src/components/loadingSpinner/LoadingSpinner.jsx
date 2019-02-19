import React from 'react';
import PropTypes from 'prop-types';

import './LoadingSpinner.scss';

const LoadingSpinner = (props) => {
  const { center } = props;
  const style = center ? { justifyContent: 'center' } : {};

  return (
    <div className="loading-spinner-container" style={style}>
      <div className="LoadingSpinner"/>
    </div>
  );
};

LoadingSpinner.propTypes = {
  center: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
  center: undefined,
};


export default LoadingSpinner;

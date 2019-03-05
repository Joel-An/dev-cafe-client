import React from 'react';
import PropTypes from 'prop-types';

import './InlineCode.scss';

const InlineCode = ({ value }) => (
  <code className="inline-code">
    {value}
  </code>
);

InlineCode.propTypes = {
  value: PropTypes.string,
};

InlineCode.defaultProps = {
  value: '',
};

export default InlineCode;

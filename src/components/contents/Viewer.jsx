import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Viewer = (props) => {
  const { contents } = props;
  return (
    <ReactMarkdown source={contents}/>
  );
};

Viewer.propTypes = {
  contents: PropTypes.string,
};

Viewer.defaultProps = {
  contents: '',
};

export default Viewer;

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

const Viewer = (props) => {
  const { contents } = props;
  return (
    <ReactMarkdown
      source={contents}
      renderers={{ code: CodeBlock }}
    />
  );
};

Viewer.propTypes = {
  contents: PropTypes.string,
};

Viewer.defaultProps = {
  contents: '',
};

export default Viewer;

import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import CodeBlock from './CodeBlock';
import InlineCode from './InlineCode';

import './Viewer.scss';

const Viewer = (props) => {
  const { contents, className } = props;
  return (
    <ReactMarkdown
      source={contents}
      className={className}
      renderers={{ code: CodeBlock, inlineCode: InlineCode }}
    />
  );
};

Viewer.propTypes = {
  contents: PropTypes.string,
  className: PropTypes.string,
};

Viewer.defaultProps = {
  contents: '',
  className: undefined,
};

export default Viewer;

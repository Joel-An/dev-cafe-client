import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import CodeBlock from './CodeBlock';
import InlineCode from './InlineCode';

import './Viewer.scss';

const Viewer = (props) => {
  const { contents } = props;
  return (
    <ReactMarkdown
      source={contents}
      renderers={{ code: CodeBlock, inlineCode: InlineCode }}
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

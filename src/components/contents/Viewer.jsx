import React from 'react';

import ReactMarkdown from 'react-markdown';

const Viewer = (props) => {
  const { contents } = props;
  return (
    <ReactMarkdown source={contents}/>
  );
};

export default Viewer;

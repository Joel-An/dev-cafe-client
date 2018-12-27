import React from 'react';

import Comment from './Comment';

const ChildCommentList = ({ childComments, token }) => {
  if (!childComments.length) {
    return null;
  }
  const style = { border: '0.5px solid grey', padding: 20 };

  return (
    <ul style={style}>
      {childComments.map(comment => <Comment comment={comment}/>)}
    </ul>
  );
};

export default ChildCommentList;

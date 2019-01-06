import React from 'react';

import Comment from './Comment';

const ChildCommentList = (props) => {
  const { childCommentIds, users, comments } = props;

  if (!childCommentIds.length) {
    return null;
  }
  const style = { border: '0.5px solid grey', padding: 20 };

  return (
    <ul style={style}>
      {childCommentIds.map(id => <Comment comments={comments} commentId={id} users={users}/>)}
    </ul>
  );
};

export default ChildCommentList;

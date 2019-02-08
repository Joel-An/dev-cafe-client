import React from 'react';

import CommentListItem from './CommentListItem';

const style = { border: '0.5px solid grey', padding: 20 };

const ChildCommentList = (props) => {
  const { childCommentIds } = props;

  if (!childCommentIds.length) {
    return null;
  }

  return (
    <ul style={style}>
      {childCommentIds.map(childId => <CommentListItem commentId={childId} key={childId}/>)}
    </ul>
  );
};

export default ChildCommentList;

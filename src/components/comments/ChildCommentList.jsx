import React from 'react';

import CommentListItem from './CommentListItem';

import './ChildCommentList.scss';

const ChildCommentList = (props) => {
  const { childCommentIds } = props;

  if (!childCommentIds.length) {
    return null;
  }

  return (
    <ul className="ChildCommentList">
      {childCommentIds.map(childId => <CommentListItem commentId={childId} key={childId}/>)}
    </ul>
  );
};

export default ChildCommentList;

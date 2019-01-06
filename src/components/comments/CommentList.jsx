import React from 'react';

import Comment from './Comment';

const CommentList = (props) => {
  const { entities, parentCommentIds, postId } = props;
  const { comments, users } = entities;

  if (parentCommentIds.length == 0) {
    return <p>댓글이 없다!</p>;
  }
  const style = { border: '0.5px solid grey' };

  return (
    <ul style={style}>
      {parentCommentIds.map(id => <Comment
        comments={comments}
        commentId={id}
        users={users}
      />)}
    </ul>
  );
};

export default CommentList;

import React from 'react';

import Comment from './Comment';

const CommentList = ({
 comments, post, token, getComments 
}) => {
  if (!comments) {
    return null;
  }
  const style = { border: '0.5px solid grey' };

  return (
    <ul style={style}>
      {comments.map(comment => <Comment
        comment={comment}
        post={post}
        token={token}
        getComments={getComments}
      />)}
    </ul>
  );
};

export default CommentList;

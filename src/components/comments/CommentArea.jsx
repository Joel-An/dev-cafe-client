import React from 'react';
import PropTypes from 'prop-types';

import CommentList from './CommentList';
import WriteComment from './WriteComment';

const CommentArea = (props) => {
  const { postId } = props;

  return (
    <div className="CommentArea">
      <CommentList postId={postId} />
      <WriteComment postId={postId} />
    </div>
  );
};

export default CommentArea;

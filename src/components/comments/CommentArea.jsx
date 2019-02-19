import React from 'react';

import { postIdPropType } from '../../containers/PostContainer';
import CommentList from './CommentList';
import WriteComment from './WriteComment';

const CommentArea = (props) => {
  const { postId } = props;

  return (
    <div className="CommentArea">
      <WriteComment postId={postId} autofocus={false} key="defaultCommentForm"/>
      <CommentList postId={postId} />
    </div>
  );
};

CommentArea.propTypes = {
  postId: postIdPropType.isRequired,
};

export default CommentArea;

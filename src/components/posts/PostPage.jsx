import React from 'react';

import PostView from './PostView';
import CommentArea from '../comments/CommentArea';

const PostPage = (props) => {
  const { match } = props;
  const { id: postId } = match.params;

  return (
    <div>
      <PostView postId={postId}/>
      <CommentArea
        postId={postId}
      />
    </div>
  );
};

export default PostPage;

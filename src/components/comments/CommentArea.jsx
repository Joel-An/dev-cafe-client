import React from 'react';
import PropTypes from 'prop-types';

import CommentList from './CommentList';
import WriteComment from './WriteComment';
import withCommentsMetaContainer from '../../containers/CommentsMetaContainer';

const CommentArea = (props) => {
  const { postId, entities, commentsByPost } = props;
  const commentsInfo = commentsByPost[postId];
  const isFetching = (typeof commentsInfo === 'undefined') || commentsInfo.isFetching;

  return (
    <div>
      {isFetching
        ? 'Loading comments...'
        : <CommentList
          entities={entities}
          parentCommentIds={commentsInfo.ids}
          postId={postId}
        />
      }
      <WriteComment postId={postId} />
    </div>
  );
};

export default withCommentsMetaContainer(CommentArea);

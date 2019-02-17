import React from 'react';

import CommentListItem from './CommentListItem';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import withCommentsMetaContainer from '../../containers/CommentsMetaContainer';

const CommentList = (props) => {
  const { commentsMeta } = props;

  if (!commentsMeta || (commentsMeta.isFetchingComments && commentsMeta.ids.length === 0)) {
    return <LoadingSpinner/>;
  }

  return (
    <ul className="CommentList">
      {commentsMeta.ids.map(id => <CommentListItem commentId={id} key={id}/>)}
      {commentsMeta.isFetchingComments && <LoadingSpinner key="isFetchingComments"/>}
      {commentsMeta.isFetchingNewComment && <LoadingSpinner key="isFetchingNewComment"/>}
    </ul>
  );
};

export default withCommentsMetaContainer(CommentList);

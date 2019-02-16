import React from 'react';

import CommentListItem from './CommentListItem';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import withCommentsMetaContainer from '../../containers/CommentsMetaContainer';

const CommentList = (props) => {
  const { commentsMeta } = props;

  if (!commentsMeta || (commentsMeta.isFetching && commentsMeta.ids.length === 0)) {
    return <LoadingSpinner/>;
  }

  if (commentsMeta.ids.length === 0) {
    return <p>댓글이 없어!</p>;
  }

  return (
    <ul className="CommentList">
      {commentsMeta.ids.map(id => <CommentListItem commentId={id} key={id}/>)}
      {commentsMeta.isFetching && <LoadingSpinner key="isLoading"/>}
    </ul>
  );
};

export default withCommentsMetaContainer(CommentList);

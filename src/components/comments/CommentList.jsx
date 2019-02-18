import React from 'react';
import { connect } from 'react-redux';

import CommentListItem from './CommentListItem';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import withCommentsMetaContainer from '../../containers/CommentsMetaContainer';
import { connectComponent } from '../../utils';

import { fetchNextPageComments as fetchNextPageCommentsAction } from '../../store/actions/comments';

const CommentList = (props) => {
  const { commentsMeta } = props;

  if (!commentsMeta || (commentsMeta.isFetchingComments && commentsMeta.ids.length === 0)) {
    return <LoadingSpinner center/>;
  }

  return (
    <ul className="CommentList">
      {commentsMeta.ids.map(id => <CommentListItem commentId={id} key={id}/>)}
      {commentsMeta.isFetchingComments && <LoadingSpinner key="isFetchingComments" center/>}
      {commentsMeta.isFetchingNewParentComment && <LoadingSpinner key="isFetchingNewComment" center/>}
    </ul>
  );
};

const mapDispatchToProps = { fetchNextPageComments: fetchNextPageCommentsAction };

export default connectComponent(CommentList,
  [
    connect(null, mapDispatchToProps),
    withCommentsMetaContainer,
  ]);

import React from 'react';

import CommentListItem from './CommentListItem';
import withCommentsMetaContainer from '../../containers/CommentsMetaContainer';

const CommentList = (props) => {
  const { commentsMeta } = props;

  if (!commentsMeta) {
    return <p>Loading...</p>;
  }

  if (commentsMeta.ids.length === 0) {
    return <p>댓글이 없어!</p>;
  }

  return (
    <ul className="CommentList">
      {commentsMeta.ids.map(id => <CommentListItem commentId={id} key={id}/>)}
    </ul>
  );
};

export default withCommentsMetaContainer(CommentList);

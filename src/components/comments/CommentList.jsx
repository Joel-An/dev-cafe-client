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

  const style = { border: '0.5px solid grey' };

  return (
    <ul style={style}>
      {commentsMeta.ids.map(id => <CommentListItem commentId={id} />)}
    </ul>
  );
};

export default withCommentsMetaContainer(CommentList);

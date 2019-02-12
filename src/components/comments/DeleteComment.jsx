import React from 'react';

import { deleteComment } from '../../api/comments';
import withTokenContainer from '../../containers/TokenContainer';
import ConfirmButton from '../popups/buttons/ConfirmButton';

const DeleteComment = (props) => {
  const { commentId, token } = props;

  const reqDeleteComment = () => new Promise((resolve, reject) => {
    deleteComment(commentId, token)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });

  return (
    <ConfirmButton
      onConfirm={reqDeleteComment}
      title="댓글 삭제"
      message="삭제하시겠습니까?"
    >
      삭제
    </ConfirmButton>
  );
};

export default withTokenContainer(DeleteComment);

import React from 'react';

import { deleteComment } from '../../api/comments';
import withToken from '../../containers/WithToken';
import withAddNotification from '../notifications/WithAddNotification';

import { connectComponent } from '../../utils';

import ConfirmButton from '../popups/buttons/ConfirmButton';

const DeleteComment = (props) => {
  const { commentId, token, addNotification } = props;

  const reqDeleteComment = () => new Promise((resolve, reject) => {
    deleteComment(commentId, token)
      .then(() => {
        addNotification({
          message: '댓글이 삭제되었습니다 ㅜㅜ',
        });
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

export default connectComponent(DeleteComment,
  [
    withToken,
    withAddNotification,
  ]);

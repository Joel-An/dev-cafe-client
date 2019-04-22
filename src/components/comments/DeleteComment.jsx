import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { deleteComment } from '../../api/comments';
import withToken, { tokenPropType } from '../../containers/WithToken';
import withAddNotification, { addNotificationPropType } from '../notifications/WithAddNotification';
import { commentIdPropType } from '../../containers/WithComment';

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
      <FontAwesomeIcon icon="trash-alt"/>
    </ConfirmButton>
  );
};

DeleteComment.propTypes = {
  token: tokenPropType.type,
  addNotification: addNotificationPropType.type.isRequired,
  commentId: commentIdPropType.isRequired,
};

DeleteComment.defaultProps = {
  token: tokenPropType.default,
};

export default connectComponent(DeleteComment,
  [
    withToken,
    withAddNotification,
  ]);

import React from 'react';

import { deleteComment } from '../../api/comments';
import withTokenContainer from '../../containers/TokenContainer';

const DeleteComment = (props) => {
  const { commentId, token } = props;

  const onClick = () => {
    deleteComment(commentId, token)
      .then(() => {
        // TODO: 삭제되었습니다.
      })
      .catch((err) => {
        // TODO: 클래스로 바꾸든가, redux-saga로 에러를 알리든가 결정해서 구현예정
        // eslint-disable-next-line no-alert
        window.alert(err.response.data.message);
      });
  };
  return (
    <button type="button" onClick={onClick}>
      삭제
    </button>
  );
};

export default withTokenContainer(DeleteComment);
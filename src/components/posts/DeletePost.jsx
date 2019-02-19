import React from 'react';
import { withRouter } from 'react-router-dom';

import { deletePost } from '../../api/posts';
import withToken, { tokenPropType } from '../../containers/WithToken';
import withAddNotification, { addNotificationPropType } from '../notifications/WithAddNotification';
import { connectComponent } from '../../utils';

import ConfirmButton from '../popups/buttons/ConfirmButton';

const DeletePost = (props) => {
  const {
    postId, token, history, categoryId, addNotification,
  } = props;

  const reqDeletePost = () => new Promise((resolve, reject) => {
    deletePost(postId, token)
      .then(() => {
        history.push(`/posts?category=${categoryId}`);
        addNotification({
          message: '글이 삭제되었습니다ㅠㅠ',
        });
        resolve();
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });

  return (
    <ConfirmButton
      onConfirm={reqDeletePost}
      title="글 삭제"
      message="삭제하시겠습니까?"
    >
      삭제
    </ConfirmButton>
  );
};

DeletePost.propTypes = {
  token: tokenPropType.type,
  addNotification: addNotificationPropType.type.isRequired,
};

DeletePost.defaultProps = {
  token: tokenPropType.default,
};

export default connectComponent(DeletePost,
  [
    withRouter,
    withToken,
    withAddNotification,
  ]);

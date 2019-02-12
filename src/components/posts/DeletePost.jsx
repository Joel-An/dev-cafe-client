import React from 'react';
import { withRouter } from 'react-router-dom';

import { deletePost } from '../../api/posts';
import withTokenContainer from '../../containers/TokenContainer';

import ConfirmButton from '../popups/buttons/ConfirmButton';

const DeletePost = (props) => {
  const {
    postId, token, history, categoryId,
  } = props;

  const reqDeletePost = () => new Promise((resolve, reject) => {
    deletePost(postId, token)
      .then(() => {
        history.push(`/posts?category=${categoryId}`);
        resolve();
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });

  return (
    <ConfirmButton
      onConfirm={reqDeletePost}
      message="삭제하시겠습니까?"
    >
      삭제
    </ConfirmButton>
  );
};

const DeletePostWithRouter = withRouter(DeletePost);

export default withTokenContainer(DeletePostWithRouter);

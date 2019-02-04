import React from 'react';
import { withRouter } from 'react-router-dom';

import { deletePost } from '../../api/posts';
import withTokenContainer from '../../containers/TokenContainer';

const DeletePost = (props) => {
  const {
    postId, token, history, categoryId,
  } = props;

  const onClick = () => {
    deletePost(postId, token)
      .then(() => {
        // eslint-disable-next-line no-alert
        window.alert('삭제되었습니다.');

        // TODO: 이전에 보던 목록 ex) /posts?category=all 로 돌아가려면 redux-router를 사용해야할듯
        history.push(`/posts?category=${categoryId}`);
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

const DeletePostWithRouter = withRouter(DeletePost);

export default withTokenContainer(DeletePostWithRouter);

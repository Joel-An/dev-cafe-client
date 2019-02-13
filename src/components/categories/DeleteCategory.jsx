import React from 'react';
import PropTypes from 'prop-types';
import withTokenContainer from '../../containers/TokenContainer';
import withAddNotification from '../notifications/WithAddNotification';

import { connectComponent } from '../../utils';

import ConfirmButton from '../popups/buttons/ConfirmButton';
import * as api from '../../api/categories';

const DeleteCategory = (props) => {
  const { id, token, addNotification } = props;

  const reqDeleteCategory = () => new Promise((resolve, reject) => {
    api.deleteCategory(id, token)
      .then(() => {
        addNotification({
          message: '카테고리가 삭제되었습니다 ㅜㅠ',
        });
        resolve();
      })
      .catch((err) => {
        reject(err.response.data.message);
      });
  });

  return (
    <ConfirmButton
      onConfirm={reqDeleteCategory}
      title="카테고리 삭제"
      message="삭제하시겠습니까?"
    >
      삭제
    </ConfirmButton>
  );
};

DeleteCategory.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default connectComponent(DeleteCategory,
  [
    withTokenContainer,
    withAddNotification,
  ]);

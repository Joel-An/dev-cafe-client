import React from 'react';
import PropTypes from 'prop-types';
import withToken, { tokenPropType } from '../../containers/WithToken';
import withAddToastNotification, { addToastNotificationPropInfo } from '../toastNotifications/WithAddToastNotification';

import { connectComponent } from '../../utils';

import ConfirmButton from '../popups/buttons/ConfirmButton';
import * as api from '../../api/categories';

const DeleteCategory = (props) => {
  const { id, token, addToastNotification } = props;

  const reqDeleteCategory = () => new Promise((resolve, reject) => {
    api.deleteCategory(id, token)
      .then(() => {
        addToastNotification({
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
  token: tokenPropType.type,
  addToastNotification: addToastNotificationPropInfo.type.isRequired,
};

DeleteCategory.defaultProps = {
  token: tokenPropType.default,
};

export default connectComponent(DeleteCategory,
  [
    withToken,
    withAddToastNotification,
  ]);

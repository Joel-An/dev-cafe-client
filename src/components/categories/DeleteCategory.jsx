import React from 'react';
import PropTypes from 'prop-types';
import withTokenContainer from '../../containers/TokenContainer';
import ConfirmButton from '../popups/buttons/ConfirmButton';
import * as api from '../../api/categories';

const DeleteCategory = (props) => {
  const { id, token } = props;

  const reqDeleteCategory = () => new Promise((resolve, reject) => {
    api.deleteCategory(id, token)
      .then(() => {
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

export default withTokenContainer(DeleteCategory);

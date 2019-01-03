import React from 'react';
import PropTypes from 'prop-types';
import withTokenContainer from '../../containers/TokenContainer';
import * as api from '../../api/categories';
import { fetchCategories } from '../../store/actions/categories';

const DeleteCategory = (props) => {
  const { id, token, dispatch } = props;

  const onClick = () => {
    api.deleteCategory(id, token)
      .then((result) => {
        if (result.status === 204) {
          const refreshCache = true;
          dispatch(fetchCategories(refreshCache));
        }
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

DeleteCategory.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withTokenContainer(DeleteCategory);

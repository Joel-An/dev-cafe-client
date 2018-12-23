import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const DeleteCategory = ({ id, token }) => {
  const onClick = () => {
    const config = { headers: { 'x-access-token': token } };
    axios
      .delete(`/api/v1/categories/${id}`, config)
      .then((result) => {
        if (result.status === 204) {
          console.log('OK!');
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <button type="button" onClick={onClick}>
      삭제
    </button>
  );
};

DeleteCategory.prototypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};


export default DeleteCategory;

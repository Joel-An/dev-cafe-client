import React from 'react';
import { Link } from 'react-router-dom';
import withLastVisitedCategoryId, { lastVisitedCategoryIdPropType } from '../../containers/WithLastVisitedCategoryId';

const WritePostButton = (props) => {
  const { lastVisitedCategoryId } = props;
  return (
    <Link to={`/write/${lastVisitedCategoryId}`}>
      <button type="button">
        글쓰기
      </button>
    </Link>
  );
};

WritePostButton.propTypes = {
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.type,
};

WritePostButton.defaultProps = {
  lastVisitedCategoryId: lastVisitedCategoryIdPropType.default,
};

export default withLastVisitedCategoryId(WritePostButton);

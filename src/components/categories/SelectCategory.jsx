import React from 'react';
import PropTypes from 'prop-types';

import withCategoriesContainer, { CategoriesContainerPropTypes, CategoriesContainerDefaultProps } from '../../containers/CategoriesContainer';
// TODO: Fragment <></> 삭제. 코드를 더 깔끔하게...

const renderCategory = category => (
  <option key={category._id} value={category._id}>{category.name}</option>
);

const rederSubCategories = (categories, id) => {
  const parent = categories[id];
  if (!parent.children.length) {
    return null;
  }

  return (
    <>
      {parent.children.map(childId => (
        <option key={childId} value={childId}>
          {`ㄴ${categories[childId].name}`}
        </option>
      ))}
    </>
  );
};

const SelectCategory = (props) => {
  const {
    categories, parentCategoryIds, onSelect, selectedCategory,
  } = props;
  const isEmpty = !parentCategoryIds.length;

  if (!isEmpty && !selectedCategory) {
    // TODO: 카테고리 로딩 전에 /write 페이지로 바로 접속하면 Redux랑 충돌함
    onSelect(categories[parentCategoryIds[0]]._id);
  }

  const onChange = (e) => {
    onSelect(e.target.value);
  };

  return (
    <select value={selectedCategory} onChange={onChange}>
      {isEmpty
        ? <p key="Loading">Loading...</p>
        : parentCategoryIds.map(id => (
          <>
            {renderCategory(categories[id])}
            {rederSubCategories(categories, id)}
          </>
        ))
      }
    </select>
  );
};

SelectCategory.propTypes = {
  categories: CategoriesContainerPropTypes.categories,
  parentCategoryIds: CategoriesContainerPropTypes.parentCategoryIds,
  onSelect: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

SelectCategory.defaultProps = {
  categories: CategoriesContainerDefaultProps.categories,
  parentCategoryIds: CategoriesContainerDefaultProps.parentCategoryIds,
};

export default withCategoriesContainer(SelectCategory);

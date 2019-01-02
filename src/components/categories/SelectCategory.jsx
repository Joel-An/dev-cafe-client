import React from 'react';
import PropTypes from 'prop-types';

// TODO: Fragment <></> 삭제. 코드를 더 깔끔하게...

const renderCategory = category => (
  <option key={category._id} value={category._id}>{category.name}</option>
);

const rederSubCategories = (categories, name) => {
  const parent = categories[name];
  if (!parent.children.length) {
    return null;
  }

  return (
    <>
      {parent.children.map(childName => (
        <option key={categories[childName]._id} value={categories[childName]._id}>
          {`ㄴ${categories[childName].name}`}
        </option>
      ))}
    </>
  );
};

const SelectCategory = (props) => {
  const {
    categories, parentCategoryNames, onSelect, selectedCategory,
  } = props;
  const isEmpty = !parentCategoryNames.length;

  if (!isEmpty && !selectedCategory) {
    // TODO: 카테고리 로딩 전에 /write 페이지로 바로 접속하면 Redux랑 충돌함
    onSelect(categories[parentCategoryNames[0]]._id);
  }

  const onChange = (e) => {
    onSelect(e.target.value);
  };


  return (
    <select value={selectedCategory} onChange={onChange}>
      {isEmpty
        ? <p key="Loading">Loading...</p>
        : parentCategoryNames.map(name => (
          <>
            {renderCategory(categories[name])}
            {rederSubCategories(categories, name)}
          </>
        ))
      }
    </select>
  );
};

const Category = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.string, // default: null
  isChild: PropTypes.bool.isRequired,
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
});

SelectCategory.propTypes = {
  categories: PropTypes.objectOf(Category).isRequired,
  parentCategoryNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};


export default SelectCategory;

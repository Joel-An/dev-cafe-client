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

class SelectCategory extends React.Component {
  componentDidMount() {
    this.updateSelectedCategoryIfEmpty();
  }

  componentDidUpdate() {
    this.updateSelectedCategoryIfEmpty();
  }

  updateSelectedCategoryIfEmpty = () => {
    /*
      1. "전체보기 -> 글쓰기"로 접근하는 경우에는
          카테고리를 임의로 지정해서 onSelect를 이용해 업데이트 해줘야한다.
      2.  두번째 조건은 카테고리목록 fetch가 늦어지는 경우를 고려한 것
    */
    const { parentCategoryIds, onSelect, selectedCategory } = this.props;

    if (!selectedCategory && parentCategoryIds.length !== 0) {
      onSelect(parentCategoryIds[0]);
    }
  }

  render() {
    const {
      categories, parentCategoryIds, onSelect, selectedCategory,
    } = this.props;
    const isEmpty = !parentCategoryIds.length;

    const onChange = (e) => {
      onSelect(e.target.value);
    };

    return (
      <select value={selectedCategory} onChange={onChange}>
        {isEmpty
          ? <option key="Loading" value="loading">Loading...</option>
          : parentCategoryIds.map(id => (
          <>
            {renderCategory(categories[id])}
            {rederSubCategories(categories, id)}
          </>
          ))
        }
      </select>
    );
  }
}

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

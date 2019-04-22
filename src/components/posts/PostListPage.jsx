import React, { Fragment } from 'react';
import Helmet from 'react-helmet-async';
import { connect } from 'react-redux';

import PostList from './PostList';
import { getCategoryById } from '../../store/selectors/categories';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import { categoryPropType } from '../../containers/WithCategory';

export const parseCategoryId = (query) => {
  const categoryId = query.slice(query.indexOf('=') + 1);
  return categoryId;
};

const PostListPage = (props) => {
  const { category } = props;

  if (!category) {
    return (
      <LoadingSpinner center/>
    );
  }

  return (
    <Fragment>
      <Helmet>
        <title>{category.name} | Dev Cafe</title>
        <meta
          name="description"
          content={`카테고리: ${category.name}`}
        />
      </Helmet>
      <div className="PostListPage">
        <PostList categoryId={category._id}/>
      </div>
    </Fragment>

  );
};

const all = { _id: 'all', name: '전체보기', isChild: false };

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  const { search: query } = location;
  const categoryId = parseCategoryId(query);

  if (categoryId === 'all') {
    return { category: all, categoryId };
  }

  const category = getCategoryById(state, categoryId);
  return { category, categoryId };
};

PostListPage.propTypes = {
  category: categoryPropType.type,
};

PostListPage.defaultProps = {
  category: categoryPropType.default,
};

export default connect(mapStateToProps, null)(PostListPage);

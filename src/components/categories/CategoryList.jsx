import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const CategoryList = ({ categories }) => {
  const style = { border: '0.5px solid #eeeeee' };
  return (
    <ul style={style}>
      <li key="categoryAll">
        <Link to="/posts">전체 보기</Link>
      </li>
      {!categories.length
        ? <p>Loading</p>
        : categories.map(category => (
          <li style={style} key={category._id}>
            <Link to={{
              pathname: '/posts',
              search: `category=${category._id}`,
            }}>{category.name}</Link>
            <ChildCategories
              childCategories={category.children}
            />
          </li>
        ))
      }
    </ul>
  );
};

const ChildCategories = ({ childCategories }) => {
  if (childCategories.length === 0) {
    return null;
  }

  return (
    <ul>
      {childCategories.map(child => (
        <li key={child._id}>
          <Link to={{
            pathname: '/posts',
            search: `category=${child._id}`,
          }}>ㄴ{child.name}</Link>
        </li>
      ))
      }
    </ul>
  );
};
ChildCategories.propTypes = {
  childCategories: PropTypes.shape([{ _id: 'id', name: 'name' }]).isRequired,
};

export default CategoryList;

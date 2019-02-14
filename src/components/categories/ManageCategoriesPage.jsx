import React from 'react';

import CategoryManager from './CategoryManager';

import './ManageCategoriesPage.scss';

const ManageCategoriesPage = () => (
  <div className="ManageCategoriesPage">
    <h1>카테고리 관리</h1>
    <CategoryManager/>
  </div>
);

export default ManageCategoriesPage;

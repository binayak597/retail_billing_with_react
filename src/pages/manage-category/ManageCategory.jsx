import React from 'react'
import './ManageCategory.css';
import CategoryForm from '../../components/category-form/CategoryForm';
import CategoryList from '../../components/category-list/CategoryList';

const ManageCategory = () => {
  return (
    <div className="category-container text-light">

      <div className="left-column">
        <CategoryForm />
      </div>
      <div className="right-column">
        <CategoryList />
      </div>
    </div>
  )
}

export default ManageCategory
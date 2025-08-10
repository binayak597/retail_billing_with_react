import React from 'react'
import './DisplayCategory.css'
import Category from '../category/Category'

const DisplayCategory = ({categories, selectedCategory, setSelectedCategory}) => {
  return (
    
    <div className="row g-3" style={{width: '100%', margin: 0}}>


      {categories.map((category, idx) => (

        <div key={idx} className="col-md-3 col-sm-6" style={{padding: '0 10px'}}>

          <Category 

            categoryName={category.name}
            imgUrl={category.imgUrl}
            numberOfItems={category.items}
            bgColor={category.bgColor}
            isSelected={selectedCategory === category.categoryId}
            handleClick={() => setSelectedCategory(category.categoryId)}
          />
        </div>
      ))}
    </div>
  )
}

export default DisplayCategory
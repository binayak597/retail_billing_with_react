import React from "react";
import "./DisplayCategory.css";
import Category from "../category/Category";
import { assets } from "../../assets/assets";

const DisplayCategory = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="row g-3" style={{ width: "100%", margin: 0 }}>
      <div
        key="all"
        className="col-md-3 col-sm-6"
        style={{ padding: "0 10px" }}
      >
        <Category
          categoryName="All Items"
          imgUrl={assets.blackBox}
          numberOfItems={categories.reduce((acc, category) => acc + category.items, 0)}
          bgColor="#6c757d"
          isSelected={selectedCategory === ""}
          handleClick={() => setSelectedCategory("")}
        />
      </div>

      {categories.map((category, idx) => (
        <div
          key={idx}
          className="col-md-3 col-sm-6"
          style={{ padding: "0 10px" }}
        >
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
  );
};

export default DisplayCategory;

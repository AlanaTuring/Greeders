import React from "react";

const CategoryCard = ({ title, bgColor, logo }) => {
  return (
    <div className={`category-card ${bgColor}`}>
      <span>{title}</span>
      {logo && <img src={logo} alt={title} />}
    </div>
  );
};

export default CategoryCard;

import React from "react";
import CategoryCard from "./CategoryCard";
import aubLogo from "../assets/aub-logo.png"; // Ensure the file is in `src/assets/`

const CategoriesList = () => {
  const categories = [
    { title: "AUB", bgColor: "bg-red", logo: aubLogo },
    { title: "Clubs", bgColor: "bg-green" },
    { title: "Societies", bgColor: "bg-blue" },
    { title: "Faculties", bgColor: "bg-darkred" }
  ];

  return (
    <div className="categories-container">
      {categories.map((cat, index) => (
        <CategoryCard key={index} {...cat} />
      ))}
    </div>
  );
};

export default CategoriesList;

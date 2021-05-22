import React, { useEffect } from "react";
import { QUERY_CATEGORIES } from "../../utils/queries";

import { useQuery } from "@apollo/react-hooks";
import propTypes from "prop-types";

import * as categoriesaction from "../../actions/categoriesaction";

import { connect } from "react-redux";
function CategoryMenu({ fetchCategories, categories, setCurrentCategory }) {
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    fetchCategories(categoryData, loading);
  }, [categoryData, fetchCategories, loading]);

  const clickHandler = (id) => {
    setCurrentCategory(id);
  };

  return (
    <div>
      {categoryData ? (
        <div>
          <h2>Choose a Category:</h2>
          {categories.map((item) => (
            <button key={item._id} onClick={() => clickHandler(item._id)}>
              {item.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
propTypes.CategoryMenu = {
  fetchCategories: propTypes.func.isRequired,
  setCurrentCategory: propTypes.func.isRequired,
  categories: propTypes.array.isRequired,
  currentCategory: propTypes.object.isRequired,
};

const mapActionToProps = {
  fetchCategories: categoriesaction.fetchCategories,
  setCurrentCategory: categoriesaction.setCurrentCategory,
};
const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  currentCategory: state.categories.currentCategory,
});

export default connect(mapStateToProps, mapActionToProps)(CategoryMenu);

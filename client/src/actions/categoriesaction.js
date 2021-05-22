import { idbPromise } from "../utils/helpers";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from ".";
const fetchCategories = (categoryData, loading) => (dispatch) => {
  if (categoryData) {
    dispatch({
      type: UPDATE_CATEGORIES,
      categories: categoryData.categories,
    });
    categoryData.categories.forEach((category) => {
      idbPromise("categories", "put", category);
    });
  } else if (!loading) {
    idbPromise("categories", "get").then((categories) => {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categories,
      });
    });
  }
};

const setCurrentCategory = (id) => (dispatch) => {
  dispatch({
    type: UPDATE_CURRENT_CATEGORY,
    payload: id,
  });
};

export default setCurrentCategory;

export { fetchCategories, setCurrentCategory };

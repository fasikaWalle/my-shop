import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "../actions";

const initialState = {
  count: 0,
  currentCategory: "",
  categories: [],
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return { ...state, categories: [...action.categories] };
    case UPDATE_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    default:
      return state;
  }
}
export default categoryReducer;

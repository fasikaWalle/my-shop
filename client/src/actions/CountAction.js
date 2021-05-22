import { FETCH_POST, NEW_POST, INCREMENT_COUNT } from "../actions";

const fetchAnother = () => (dispatch) => {
  dispatch({
    type: INCREMENT_COUNT,
  });
};

export { fetchAnother };

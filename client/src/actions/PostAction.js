import { FETCH_POST, NEW_POST, INCREMENT_COUNT } from "../actions";
const fetchPost = () => (dispatch) => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      return response.json();
    })
    .then((posts) => {
      dispatch({
        type: FETCH_POST,
        payload: posts,
      });
    });
};



export { fetchPost };

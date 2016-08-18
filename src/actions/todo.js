import { types } from '../constants';

export function addTodo(text) {
  return (dispatch) => {
    dispatch({ type: types.SHOW_LOADING });
    return requestAddTodo(text)
      .then(text => {
        dispatch({ type: types.HIDE_LOADING });
        dispatch({ type: types.ADD_TODO, text });
      });
  }
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id };
}

function requestAddTodo(text) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(text); }, 2000);
  })
}

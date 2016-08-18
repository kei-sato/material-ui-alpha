import { types } from '../constants';

const initialState = [{
  id: 0,
  text: 'Hi, there!',
}];

export default function todos(state = initialState, action) {
  switch (action.type) {
  case types.ADD_TODO:
    return [...state, {
      id   : Math.max.apply(null, state.map(todo => todo.id)) + 1,
      text : action.text,
    }];

  case types.DELETE_TODO:
    return state.filter(todo => todo.id !== action.id);

  default:
    return state;
  }
}
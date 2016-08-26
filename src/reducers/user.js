import { types } from '../constants';

const initialState = {
  isAuthenticated: false,
  username: undefined,
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case types.LOGIN_SUCCESS:
    const { user: { username } } = action;
    return { ...state, isAuthenticated: true, username };
  case types.LOGOUT_SUCCESS:
    return initialState;
  default:
    return state;
  }
}

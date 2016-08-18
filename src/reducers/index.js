import { combineReducers } from 'redux';
import share from './share';
import todo from './todo';

const rootReducer = combineReducers({
  share,
  todo,
});

export default rootReducer;

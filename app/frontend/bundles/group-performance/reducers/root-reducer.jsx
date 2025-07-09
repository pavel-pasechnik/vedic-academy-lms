// A real world app will likely have many reducers and it helps to organize them in one file.
import { combineReducers } from 'redux';

import groupPerformanceReducer, {
  initialState as groupPerformanceState,
} from './group-performance-reducer';

export const initialStates = {
  groupPerformanceState,
};

const reducer = combineReducers({
  groupPerformanceStore: groupPerformanceReducer,
});

export default reducer;

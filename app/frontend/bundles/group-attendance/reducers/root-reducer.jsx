// A real world app will likely have many reducers and it helps to organize them in one file.
import { combineReducers } from 'redux';

import groupAttendanceReducer, {
  initialState as groupAttendanceState,
} from './group-attendance-reducer';

export const initialStates = {
  groupAttendanceState,
};

const reducer = combineReducers({
  groupAttendanceStore: groupAttendanceReducer,
});

export default reducer;

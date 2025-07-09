import { configureStore } from '@reduxjs/toolkit';
// See
// https://github.com/gaearon/redux-thunk and http://redux.js.org/docs/advanced/AsyncActions.html
// This is not actually used for this simple example, but you'd probably want to use this
// once your app has asynchronous actions.

import reducer, { initialStates } from '../reducers/root-reducer';

const GroupAttendanceStore = props => {
  const { people, canManage, defaultPhoto, localization, academicGroupId } = props;
  const { groupAttendanceState } = initialStates;

  const initialState = {
    groupAttendanceStore: {
      ...groupAttendanceState,
      people,
      canManage,
      defaultPhoto,
      localization,
      academicGroupId,
    },
  };

  const store = configureStore({
    reducer,
    preloadedState: initialState,
    devTools: typeof window === 'object',
  });

  return store;
};

export default GroupAttendanceStore;

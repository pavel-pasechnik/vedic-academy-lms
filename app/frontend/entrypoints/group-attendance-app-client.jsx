import { Provider } from 'react-redux';

import GroupAttendance from '@bundles/group-attendance/containers/group-attendance';
import createStore from '@bundles/group-attendance/store/group-attendance-store';

// This is how you get props from the Rails view into the redux store.
// This code binds your smart component to the redux store.
const GroupAttendanceAppClient = props => {
  const store = createStore(props);

  return (
    <Provider store={store}>
      <GroupAttendance />
    </Provider>
  );
};

export default GroupAttendanceAppClient;

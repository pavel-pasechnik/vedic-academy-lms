import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import GroupPerformance from '@bundles/group-performance/containers/group-performance';
import createStore from '@bundles/group-performance/store/group-performance-store';

const container = document.getElementById('GroupPerformanceAppClient');

if (container) {
  const root = createRoot(container);

  root.render(<GroupPerformanceAppClient />);
}

const GroupPerformanceAppClient = () => {
  const store = createStore();

  return (
    <Provider store={store}>
      <GroupPerformance />
    </Provider>
  );
};

export default GroupPerformanceAppClient;

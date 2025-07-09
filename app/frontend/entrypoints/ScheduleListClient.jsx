import { createRoot } from 'react-dom/client';

import ScheduleList from '@bundles/ScheduleList/containers/ScheduleList';

const container = document.getElementById('ScheduleListAppClient');

if (container) {
  const props = {
    url: container.dataset.url,
    headers: JSON.parse(container.dataset.headers),
    noSchedules: container.dataset.noSchedules,
  };

  const root = createRoot(container);

  root.render(<ScheduleList {...props} />);
}

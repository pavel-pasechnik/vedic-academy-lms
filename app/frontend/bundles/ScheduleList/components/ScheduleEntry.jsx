import PropTypes from 'prop-types';

import DeleteLink from './DeleteLink';
import EditLink from './EditLink';
import GroupsLinks from './GroupsLinks';
import LectorLinkOrText from './LectorLinkOrText';
import LinkOrText from './LinkOrText';

const ScheduleEntry = ({ schedule }) => (
  <tr>
    <td>
      <LinkOrText
        condition={schedule.course.canView}
        path={schedule.course.path}
        text={schedule.course.title}
      />
    </td>
    <td>
      <LectorLinkOrText lector={schedule.lector} />
    </td>
    <td>{schedule.subject}</td>
    <GroupsLinks groups={schedule.academicGroups} />
    <td>{schedule.classroom}</td>
    <td>{schedule.time}</td>
    <td className='text-right text-middle'>
      <EditLink condition={schedule.canEdit} path={schedule.editPath} />{' '}
      <DeleteLink condition={schedule.canDelete} path={schedule.deletePath} />
    </td>
  </tr>
);

ScheduleEntry.propTypes = {
  schedule: PropTypes.object.isRequired,
};

export default ScheduleEntry;

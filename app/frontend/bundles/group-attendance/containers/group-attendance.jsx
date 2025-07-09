import AttendanceWorker from '@bundles/group-attendance/workers/attendance-worker?worker';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as groupAttendanceActionCreators from '@bundles/group-attendance/actions/group-attendance-action-creators';
import AttendanceSubmitter from '@bundles/group-attendance/components/attendance-submitter';
import GroupAttendanceWidget from '@bundles/group-attendance/components/group-attendance-widget';

const worker = new AttendanceWorker();

function select(state) {
  return { groupAttendanceStore: state.groupAttendanceStore };
}

class GroupAttendance extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    groupAttendanceStore: PropTypes.object.isRequired,
  };

  actions = () => bindActionCreators(groupAttendanceActionCreators, this.props.dispatch);

  componentDidMount() {
    const actions = this.actions();

    actions.getAttendance();

    this.worker.addEventListener('message', msg => {
      actions.workerReplyDispatcher(JSON.parse(msg.data), this.postToWorker);
    });

    actions.syncNextAttendance(this.postToWorker);
  }

  postToWorker = msg => {
    this.worker.postMessage(JSON.stringify(msg));
  };

  markUnknownAndNext = attendance => {
    const { nextPerson, asyncMarkUnknown } = this.actions();

    asyncMarkUnknown(this.postToWorker, attendance);
    nextPerson();
  };

  markPresenceAndNext = (attendance, presence) => {
    const { nextPerson, asyncMarkPresence } = this.actions();

    asyncMarkPresence(this.postToWorker, attendance, presence);
    nextPerson();
  };

  render() {
    const {
      people,
      loading,
      canManage,
      defaultPhoto,
      localization,
      classSchedules,
      selectedPersonIndex,
      selectedScheduleIndex,
    } = this.props.groupAttendanceStore;

    const { nextPerson, getAttendance, previousPerson, openAttendanceSubmitter } = this.actions();

    const { markUnknownAndNext, markPresenceAndNext } = this;

    return (
      <div className='row'>
        <GroupAttendanceWidget
          {...{
            people,
            loading,
            canManage,
            getAttendance,
            classSchedules,
            openAttendanceSubmitter,
          }}
        />

        {canManage ? (
          <AttendanceSubmitter
            {...{
              data: {
                people,
                defaultPhoto,
                localization,
                classSchedules,
                selectedPersonIndex,
                selectedScheduleIndex,
              },
              actions: {
                nextPerson,
                previousPerson,
                markUnknownAndNext,
                markPresenceAndNext,
              },
            }}
          />
        ) : null}
      </div>
    );
  }
}

// Don't forget to actually use connect!
// Note that we don't export groupAttendance, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(select)(GroupAttendance);

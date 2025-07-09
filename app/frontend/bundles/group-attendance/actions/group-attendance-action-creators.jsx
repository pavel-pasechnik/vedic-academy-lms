import axios from 'axios';

import actionTypes from '@bundles/group-attendance/constants/group-attendance-constants';
import {
  deleteAttendanceFromStorage,
  mergeLocalAttendances,
  readObjectFromStorage,
  writeAttendanceToStorage,
} from '@bundles/group-attendance/helpers/stored-attendances';

export function openAttendanceSubmitter(selectedScheduleIndex) {
  return {
    selectedScheduleIndex,
    type: actionTypes.OPEN_ATTENDANCE_SUBMITTER,
  };
}

export function updateClassSchedulesAndPage(classSchedules, page) {
  return {
    page,
    type: actionTypes.UPDATE_CLASS_SCHEDULES_AND_PAGE,
    classSchedules: mergeLocalAttendances(classSchedules),
  };
}

export function showLoader() {
  return {
    type: actionTypes.SHOW_LOADER,
  };
}

export function hideLoader() {
  return {
    type: actionTypes.HIDE_LOADER,
  };
}

export function nextPerson() {
  return {
    type: actionTypes.NEXT_PERSON,
  };
}

export function previousPerson() {
  return {
    type: actionTypes.PREVIOUS_PERSON,
  };
}

export function markPresence(attendance) {
  return {
    attendance,
    type: actionTypes.MARK_PRESENCE,
  };
}

export function markUnknown(attendance) {
  return {
    attendance,
    type: actionTypes.MARK_UNKNOWN,
  };
}

export function syncNextAttendance(mesenger) {
  return dispatch => {
    const attendances = readObjectFromStorage('attendances');

    const keys = Object.keys(attendances);

    if (!keys.length) return;

    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const attendance = attendances[randomKey];
    const type = attendance.toDelete ? 'deleteAttendance' : 'markAttendance';

    mesenger({ type, attendance });
  };
}

export function workerReplyDispatcher(data, mesenger) {
  return dispatch => {
    const { type, status, attendance } = data;

    if (status === 204 && type === 'deleteAttendanceReply') {
      const { scheduleId, studentProfileId } = attendance;

      dispatch(markUnknown({ scheduleId, studentProfileId }));
    } else if (
      status === 200 &&
      (type === 'createAttendanceReply' || type === 'updateAttendanceReply')
    ) {
      dispatch(markPresence(data.response.attendance));
    }

    if (status === 200 || status === 204 || status === 404) {
      deleteAttendanceFromStorage(attendance);
      dispatch(syncNextAttendance(mesenger));
    }
  };
}

export function asyncMarkPresence(mesenger, attendance, presence) {
  return dispatch => {
    if (attendance.presence === presence) return;

    const newAttendance = { ...attendance, presence, inSync: true };

    writeAttendanceToStorage(newAttendance);

    dispatch(markPresence(newAttendance));

    mesenger({ type: 'markAttendance', attendance: newAttendance });
  };
}

export function asyncMarkUnknown(mesenger, attendance) {
  return dispatch => {
    if (attendance.id) {
      if (attendance.toDelete) return;

      const newAttendance = { ...attendance, toDelete: true, inSync: true };

      delete newAttendance.presence;

      writeAttendanceToStorage(newAttendance);

      dispatch(markUnknown(newAttendance));

      mesenger({ type: 'deleteAttendance', attendance: newAttendance });
    } else {
      deleteAttendanceFromStorage(attendance);
      dispatch(markUnknown(attendance));
    }
  };
}

export function getAttendance() {
  return async (dispatch, getState) => {
    const {
      groupAttendanceStore: { page, academicGroupId },
    } = getState();

    const nextPage = page + 1;

    dispatch(showLoader());

    try {
      const { data } = await axios.get(`/ui/schedule_attendances`, {
        params: { page: nextPage, academic_group_id: academicGroupId },
        headers: { 'Cache-Control': 'no-cache' },
      });

      if (data.classSchedules && data.classSchedules.length) {
        dispatch(updateClassSchedulesAndPage(data.classSchedules, nextPage));
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(hideLoader());
    }
  };
}

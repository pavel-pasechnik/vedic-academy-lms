import axios from 'axios';

import actionTypes from '@bundles/group-performance/constants/group-performance-constants';

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

export function toggleEditRow(examinationId) {
  return {
    examinationId,
    type: actionTypes.TOGGLE_EDIT_ROW,
  };
}

export function resultDeleted(examinationId, studentProfileId) {
  return {
    examinationId,
    studentProfileId,
    type: actionTypes.RESULT_DELETED,
  };
}

export function resultSaved(examinationResult) {
  return {
    examinationResult,
    type: actionTypes.RESULT_SAVED,
  };
}

export function openExaminationResultEditor(personId, examinationId) {
  return {
    personId,
    examinationId,
    type: actionTypes.OPEN_EXAMINATION_RESULT_EDITOR,
  };
}

function deleteResult(resultId, success, error) {
  axios
    .delete(`/ui/examination_results/${resultId}`)
    .then(response => success(response.data))
    .catch(error);
}

function updateResult(resultId, score, success, error) {
  axios
    .put(`/ui/examination_results/${resultId}`, { score })
    .then(response => success(response.data))
    .catch(error);
}

function createResult(examinationId, studentProfileId, score, success, error) {
  axios
    .post(`/ui/examination_results`, {
      score,
      examination_id: examinationId,
      student_profile_id: studentProfileId,
    })
    .then(response => success(response.data))
    .catch(error);
}

export function asyncDeleteResult(resultId, examinationId, studentProfileId) {
  return dispatch => {
    if (!resultId) return;

    dispatch(showLoader());

    const error = () => dispatch(hideLoader());
    const success = () => {
      dispatch(hideLoader());
      dispatch(resultDeleted(examinationId, studentProfileId));
    };

    deleteResult(resultId, success, error);
  };
}

export function asyncSaveResult(id, score, examinationId, studentProfileId) {
  return dispatch => {
    dispatch(showLoader());

    const error = () => dispatch(hideLoader());
    const success = data => {
      const { examinationResult } = data;

      dispatch(hideLoader());
      dispatch(resultSaved(examinationResult));
    };

    if (id) {
      updateResult(id, score, success, error);
    } else {
      createResult(examinationId, studentProfileId, score, success, error);
    }
  };
}

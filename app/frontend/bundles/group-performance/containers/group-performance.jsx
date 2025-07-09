import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as groupPerformanceActionCreators from '@bundles/group-performance/actions/group-performance-action-creators';
import GroupPerformanceWidget from '@bundles/group-performance/components/group-performance-widget';
import PerformanceEditor from '@bundles/group-performance/components/performance-editor';

function select(state) {
  return { groupPerformanceStore: state.groupPerformanceStore };
}

class GroupPerformance extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    groupPerformanceStore: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, groupPerformanceStore } = this.props;
    const actions = bindActionCreators(groupPerformanceActionCreators, dispatch);
    const {
      people,
      loading,
      canManage,
      examinations,
      localization,
      editExaminationId,
      examinationResults,
      editStudentProfileId,
      editRowExaminationId,
    } = groupPerformanceStore;

    const { toggleEditRow, asyncSaveResult, asyncDeleteResult, openExaminationResultEditor } =
      actions;

    return (
      <div className='row'>
        <GroupPerformanceWidget
          {...{
            people,
            loading,
            canManage,
            examinations,
            toggleEditRow,
            examinationResults,
            editRowExaminationId,
            openExaminationResultEditor,
          }}
        />

        <PerformanceEditor
          {...{
            data: {
              people,
              loading,
              examinations,
              localization,
              editExaminationId,
              examinationResults,
              editStudentProfileId,
            },
            actions: {
              asyncSaveResult,
              asyncDeleteResult,
            },
          }}
        />
      </div>
    );
  }
}

export default connect(select)(GroupPerformance);

import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React from 'react';

import Loader from '@lib/components/loader';

export default class PerformanceEditor extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      people: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          studentProfileId: PropTypes.number.isRequired,
        })
      ).isRequired,
      loading: PropTypes.bool.isRequired,
      examinations: PropTypes.array.isRequired,
      localization: PropTypes.shape({
        min: PropTypes.string.isRequired,
        max: PropTypes.string.isRequired,
        save: PropTypes.string.isRequired,
        delete: PropTypes.string.isRequired,
        passing: PropTypes.string.isRequired,
      }).isRequired,
      editExaminationId: PropTypes.number.isRequired,
      examinationResults: PropTypes.object.isRequired,
      editStudentProfileId: PropTypes.number.isRequired,
    }).isRequired,
    actions: PropTypes.shape({
      asyncSaveResult: PropTypes.func.isRequired,
      asyncDeleteResult: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = this.initialState(props.data);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { editStudentProfileId, editExaminationId, examinationResults } = nextProps.data;
    const examinationResult =
      (examinationResults[editExaminationId] || {})[editStudentProfileId] || {};
    const value = examinationResult.score || 0;
    const examinationResultId = examinationResult.id;

    if (value !== prevState.value || examinationResultId !== prevState.examinationResultId) {
      return {
        value,
        examinationResultId,
      };
    }

    return null;
  }

  handleChange = value => {
    this.setState({
      value,
    });
  };

  initialState = ({ editStudentProfileId, editExaminationId, examinationResults }) => {
    const examinationResult =
      (examinationResults[editExaminationId] || {})[editStudentProfileId] || {};

    return {
      value: examinationResult.score || 0,
      examinationResultId: examinationResult.id,
    };
  };

  deleteResult = () => {
    const {
      data: { editStudentProfileId, editExaminationId },
      actions: { asyncDeleteResult },
    } = this.props;

    asyncDeleteResult(this.state.examinationResultId, editExaminationId, editStudentProfileId);
  };

  saveResult = () => {
    const {
      data: { editStudentProfileId, editExaminationId },
      actions: { asyncSaveResult },
    } = this.props;

    const { value, examinationResultId } = this.state;

    asyncSaveResult(examinationResultId, value, editExaminationId, editStudentProfileId);
  };

  render() {
    const {
      data: {
        people,
        loading,
        editStudentProfileId,
        examinations,
        localization,
        editExaminationId,
      },
    } = this.props;

    const person = people.find(psn => psn.studentProfileId === editStudentProfileId) || {};
    const examination = examinations.find(ex => ex.id === editExaminationId) || {};

    const { value } = this.state;

    const labels = {
      [examination.minResult]: localization.min,
      [examination.passingScore]: localization.passing,
      [examination.maxResult]: localization.max,
    };

    return (
      <div
        id='examinationResultEditorModal'
        role='dialog'
        tabIndex='-1'
        className='modal fade'
        aria-labelledby='gridSystemModalLabel'>
        <div className='modal-dialog modal-sm' role='document'>
          <div className='modal-content'>
            <Loader visible={loading} />

            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>

              <h4 className='modal-title text-center'>
                <b>{person.name}</b>
                <br />
                <b>{examination.title}</b>
                <br />
                {examination.courseTitle}
              </h4>
            </div>

            <div className='modal-body'>
              <div className='row'>
                <div className='col-sm-12'>
                  <h4 className='text-center'>
                    <p>{examination.description}</p>

                    <div className='slider custom-labels'>
                      <Slider
                        min={examination.minResult || 0}
                        max={examination.maxResult || 1}
                        value={value}
                        marks={labels}
                        onChange={this.handleChange}
                        handleLabel={`${value}`}
                      />
                    </div>
                  </h4>
                </div>
              </div>
            </div>

            <div className='modal-footer text-center'>
              <div className='row'>
                <div className='col-sm-12 text-center'>
                  <button type='button' onClick={this.saveResult} className='btn btn-primary'>
                    {localization.save}
                  </button>

                  <button type='button' onClick={this.deleteResult} className='btn btn-danger'>
                    {localization.delete}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

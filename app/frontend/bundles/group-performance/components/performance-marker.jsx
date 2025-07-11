import PropTypes from 'prop-types';

import IconButton from '@lib/components/bootstrap-icon-button';

const PerformanceMarker = ({
  score,
  personId,
  examinationId,
  isEditExamination,
  examinationPassingScore,
  openExaminationResultEditor,
}) => {
  const openEditor = () => openExaminationResultEditor(personId, examinationId);

  let content = '\u00A0';
  let cellClass = 'cell editable-cell';
  let buttonClass = 'default';

  if (score !== undefined) {
    if (score >= examinationPassingScore) {
      content = <span className='glyphicon glyphicon-ok' />;
      cellClass = 'cell bg-success editable-cell';
      buttonClass = 'success';
    } else {
      content = <span className='glyphicon glyphicon-remove' />;
      cellClass = 'cell bg-danger editable-cell';
      buttonClass = 'danger';
    }

    if (examinationPassingScore !== 1) content = score;
  }

  const button = isEditExamination ? (
    <IconButton size='sm' icon='pencil' onClick={openEditor} color={buttonClass} />
  ) : null;

  return <div className={cellClass}>{button || content}</div>;
};

PerformanceMarker.propTypes = {
  score: PropTypes.number,
  personId: PropTypes.number.isRequired,
  examinationId: PropTypes.number.isRequired,
  isEditExamination: PropTypes.bool.isRequired,
  examinationPassingScore: PropTypes.number.isRequired,
  openExaminationResultEditor: PropTypes.func.isRequired,
};

export default PerformanceMarker;

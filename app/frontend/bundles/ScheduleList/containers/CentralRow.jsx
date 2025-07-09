import PropTypes from 'prop-types';
import React from 'react';

export default class CentralRow extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.element)])
      .isRequired,
  };

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <tr>
        <td className='central-row' colSpan='7'>
          {this.props.children}
        </td>
      </tr>
    );
  }
}

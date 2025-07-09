import PropTypes from 'prop-types';
import React from 'react';

import Paginator from '@bundles/ScheduleList/components/Paginator';
import SchedulesTable from '@bundles/ScheduleList/components/SchedulesTable';
import TimesSelector from '@bundles/ScheduleList/components/TimesSelector';
import Loader from '@lib/components/loader';
import bindAll from '@lib/helpers/bind-all';

export default class ScheduleList extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    headers: PropTypes.array.isRequired,
    noSchedules: PropTypes.string.isRequired,
    hideDirections: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      pages: 1,
      loading: true,
      direction: 'future',
      schedules: [],
      currentPage: 1,
    };

    bindAll(this, '_updateSchedules');
  }

  componentDidMount() {
    this.mounted = true;

    return this._updateSchedules();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  _computedUrl() {
    const url = `${this.props.url}?page=${this.state.currentPage}`;

    return this.props.hideDirections ? url : `${url}&direction=${this.state.direction}`;
  }

  _updateSchedules(page, direction) {
    this.setState(
      (prevState, props) => ({
        loading: true,
        direction: direction || prevState.direction,
        currentPage: page || prevState.currentPage,
      }),
      () =>
        fetch(this._computedUrl(), {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
          })
          .then(data => {
            if (this.mounted) {
              this.setState({
                pages: data.pages,
                loading: false,
                schedules: data.classSchedules,
              });
            }
          })
          .catch(error => {
            console.error(this._computedUrl(), error.toString());
            this.setState({ loading: false });
          })
    );
  }

  render() {
    const onTimeSelect = direction => () => this._updateSchedules(1, direction);
    const timeSelector = (
      <div className='col-xs-12 vert-offset-bottom-1'>
        <TimesSelector onChange={onTimeSelect} direction={this.state.direction} />
      </div>
    );

    return (
      <div className='row classSchedule'>
        {this.props.hideDirections ? null : timeSelector}

        <div className='col-xs-12'>
          <Loader visible={this.state.loading} />

          <SchedulesTable
            headers={this.props.headers}
            loading={this.state.loading}
            schedules={this.state.schedules}
            noSchedules={this.props.noSchedules}
          />
        </div>

        <Paginator
          maxPages={this.state.pages}
          direction={this.state.direction}
          onChangePage={this._updateSchedules}
        />
      </div>
    );
  }
}

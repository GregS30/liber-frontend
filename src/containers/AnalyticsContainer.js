import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getAnalytics } from '../actions';

import FilterContainer from "./FilterContainer.js";
import ReportContainer from "./ReportContainer.js";
// import TaskMetricsContainer from "./TaskMetricsContainer.js";

class AnalyticsContainer extends Component {

  chartIt = () => {
    console.log("ChartIt")
    let periodIndex = this.props.periods.findIndex((item) => item.name === this.props.periodFilter)
    this.props.getAnalytics(
      this.props.chartFilter,
      this.props.periods[periodIndex].start_date,
      this.props.periods[periodIndex].end_date,
      this.props.projects.find((item) => item.name === this.props.projectFilter).id,

      this.props.taskNameFilter
      ? this.props.taskNames.find((item) => item.name === this.props.taskNameFilter).id
      : '',

      this.props.userFilter
      ? this.props.users.find((item) => item.username === this.props.userFilter).id
      : ''
    )
  }

  render() {
    console.log("AnalyticsContainer render", this.props)
    return (
        <Fragment>
          <div className="task-container">
            <div className="task-sidebar">
              {this.props.filtersLoaded
                ? <FilterContainer parent={'analytics'}
                  chartIt={this.chartIt}/>
                : null
              }
            </div>
            <ReportContainer />
          </div>
        </Fragment>
      )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    filtersLoaded: state.filtersLoaded,
    taskMetrics: state.taskMetrics,

    projects: state.projects,
    taskNames: state.taskNames,
    users: state.users,
    periods: state.periods,
    charts: state.charts,
    taskNameFilter: state.taskNameFilter,
    projectFilter: state.projectFilter,
    userFilter: state.userFilter,
    periodFilter: state.periodFilter,
    chartFilter: state.chartFilter,

  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAnalytics: (chartFilter, periodStart, periodEnd, projectId, taskId, userId) => dispatch(getAnalytics(chartFilter, periodStart, periodEnd, projectId, taskId, userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);

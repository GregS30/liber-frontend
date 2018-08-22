import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getAnalytics } from '../actions';

import FilterContainer from "./FilterContainer.js";
import ReportContainer from "./ReportContainer.js";

class AnalyticsContainer extends Component {

  componentDidUpdate(prevProps, prevState) {
    // console.log("componendDidUpdate")
    if ((this.props.chartFilter !== prevProps.chartFilter)
      || (this.props.periodFilter !== prevProps.periodFilter)
      || (this.props.taskNameFilter !== prevProps.taskNameFilter)
      || (this.props.projectFilter !== prevProps.projectFilter)
      || (this.props.userFilter !== prevProps.userFilter)
    ) {
      this.chartIt()
    }
  }

  chartIt = () => {
    console.log("ChartIt")
    let periodIndex = this.props.periods.findIndex((item) => item.name === this.props.periodFilter)
    this.props.getAnalytics(
      this.props.chartFilter,
      this.props.periods[periodIndex].start_date,
      this.props.periods[periodIndex].end_date,
      this.getFilterId(this.props.projectFilter, this.props.projects),
      this.getFilterId(this.props.taskNameFilter, this.props.taskNames),
      this.getFilterId(this.props.userFilter, this.props.users)
    )
  }

  getFilterId = (userInput, filterList) =>
    // if the user made no selection, then userInput is a blank string
    userInput ? filterList.find((item) => item.name === userInput).id : ''

  render() {
    console.log("AnalyticsContainer render", this.props)
    return (
        <Fragment>
          <div className="task-container">
            <div className="page-header"><h2>Analytics</h2></div>
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

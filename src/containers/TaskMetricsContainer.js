import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import TaskMetrics from "../components/TaskMetrics.js";
import { storeMetrics } from '../actions';


class TaskMetricsContainer extends Component {

  componentDidMount() {
    console.log("componendDidMount")
      this.props.storeMetrics(this.getMetrics())
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componendDidUpdate")
    if (this.props.filteredTasks !== prevProps.filteredTasks) {
      this.props.storeMetrics(this.getMetrics())
    }
  }

  getMetrics = (tasks) => {
    console.log("getMetrics()")
    return ({
      tasks: this.props.filteredTasks.length,
      jobs: [...new Set(this.props.filteredTasks.map(t => t.job.job_num))].length,
      scanners: [...new Set(this.props.filteredTasks.filter(t => t.task.task_name.name === 'scan').map(t => t.scanner.name))].length,   // scanner is only relevant for the scan task
      operators: [...new Set(this.props.filteredTasks.map(t => t.user.username))].length,
      projects: [...new Set(this.props.filteredTasks.map(t => t.task.workflow.project.name))].length
      // need to get sum of duration also
      }
    )
  }

  render() {
    console.log("TaskMetricsContainer render", this.props)
    return (
        <Fragment>
          <div className="task-list-container">
            <TaskMetrics metrics={this.props.taskMetrics}/>
          </div>
        </Fragment>
      )
  }
}

const mapStateToProps = state => {
  return {
    // isFetching: state.isFetching,
    dateFilter: state.dateFilter,
    taskNameFilter: state.taskNameFilter,
    projectFilter: state.projectFilter,
    statusFilter: state.statusFilter,
    jobFilter: state.jobFilter,
    userFilter: state.userFilter,
    tasks: state.tasks,
    filteredTasks: state.filteredTasks,
    filtersLoaded: state.filtersLoaded,
    taskMetrics: state.taskMetrics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeMetrics: (metrics) =>  dispatch(storeMetrics(metrics)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskMetricsContainer);

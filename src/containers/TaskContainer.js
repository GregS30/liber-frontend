import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getTasks } from '../actions';

import FilterContainer from "./FilterContainer.js";
import TaskListContainer from "./TaskListContainer.js";
import TaskMetricsContainer from "./TaskMetricsContainer.js";

const REFRESH_TASKS_INTERVAL = 60000

class TaskContainer extends Component {

  componentDidMount() {
    this.setupInterval()
    if (this.props.dateFilter) {
      this.props.getTasks(this.props.dateFilter)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componendDidUpdate")
    if (this.props.dateFilter !== prevProps.dateFilter) {
      this.props.getTasks(this.props.dateFilter)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  setupInterval = () => {
    // fetch new task list perodically
    this.interval = setInterval(() => {
      this.refreshTasks()
    }, REFRESH_TASKS_INTERVAL)
  }

  refreshTasks = () => {
    // console.log("refreshTasks()")
    // only tasks currently ocurring need redreshed!
    if (this.props.dateFilter === 'Today') {
      this.props.getTasks(this.props.dateFilter)
    }
  }

  render() {
    // console.log("TaskContainer render", this.props)
    return (
        <Fragment>
          <div className="task-container">
            <div className="task-sidebar">
              {this.props.filtersLoaded
                ? <FilterContainer parent={'task'}/>
                : null
              }
              <TaskMetricsContainer />
            </div>
            <TaskListContainer />
          </div>
        </Fragment>
      )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    dateFilter: state.dateFilter,
    tasks: state.tasks,
    filteredTasks: state.filteredTasks,
    filtersLoaded: state.filtersLoaded,
    taskMetrics: state.taskMetrics,
    forceTaskRender: state.forceTaskRender,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: (dateFilter) => dispatch(getTasks(dateFilter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

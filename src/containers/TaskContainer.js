import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getTasks } from '../actions';

import FilterContainer from "./FilterContainer.js";
import TaskListContainer from "./TaskListContainer.js";
import TaskMetricsContainer from "./TaskMetricsContainer.js";

class TaskContainer extends Component {

  componentDidMount() {
    // console.log("componendDidMount")
    //    this.props.getTasks('2015-09-28')  // testing only


//    this.setupInterval()


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
    this.interval = setInterval(() => {
      this.refreshTasks()
    }, 10000)
  }

  refreshTasks = () => {
    console.log("refreshTasks()")
    if (this.props.dateFilter === 'Today') {
      this.props.getTasks(this.props.dateFilter)
    }
  }

  render() {
    // console.log("TaskContainer render", this.props)
    return (
        <Fragment>
          <div className="task-container">
            <h3>TaskContainer</h3>
            {this.props.filtersLoaded
              ? <FilterContainer parent={'task'}/>
              : null
            }
            <TaskMetricsContainer />
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: (dateFilter) => dispatch(getTasks(dateFilter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

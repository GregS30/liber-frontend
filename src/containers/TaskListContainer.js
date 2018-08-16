import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import TaskListItem from "../components/TaskListItem.js";

import { storeFilteredTasks } from '../actions';

class TaskListContainer extends Component {

  componentDidMount() {
    // console.log("componendDidMount")
    this.filterTasks()
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componendDidUpdate")
    if ((this.props.dateFilter !== prevProps.dateFilter)
      || (this.props.taskNameFilter !== prevProps.taskNameFilter)
      || (this.props.projectFilter !== prevProps.projectFilter)
      || (this.props.statusFilter !== prevProps.statusFilter)
      || (this.props.jobFilter !== prevProps.jobFilter)
      || (this.props.userFilter !== prevProps.userFilter)
    ) {
      this.filterTasks()
    }
  }

  filterTasks = () => {
    let filtered = this.props.tasks.filter((jt) =>
      this.filterMatch(this.props.taskNameFilter, jt.task.task_name.name)
        && this.filterMatch(this.props.statusFilter, jt.task_state.name)
        && this.filterMatch(parseInt(this.props.jobFilter, 10), jt.job.job_num)
        && this.filterMatch(this.props.userFilter, jt.user.username)
    )
    // console.log("filter tasks", filtered)
    this.props.storeFilteredTasks(filtered)
  }

  filterMatch = (filter, value) =>
    !filter ? true : filter === value

  render() {
    // console.log("TaskListContainer render", this.props)
    return (
      <Fragment>
        <div className="task-list">
          <h3>Tasks</h3>
            <ol>
          {this.props.filteredTasks.map(jt => {
            return (
              <TaskListItem key={jt.id} item={jt} />
            )
          })}
          </ol>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    taskNameFilter: state.taskNameFilter,
    projectFilter: state.projectFilter,
    statusFilter: state.statusFilter,
    jobFilter: state.jobFilter,
    userFilter: state.userFilter,
    dateFilter: state.dateFilter,
    tasks: state.tasks,
    filteredTasks: state.filteredTasks,
    filtersLoaded: state.filtersLoaded,
    taskMetrics: state.taskMetrics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeFilteredTasks: (filteredTasks) =>  dispatch(storeFilteredTasks(filteredTasks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);

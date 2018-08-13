import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Adapter from './../adapters/Adapter'

import { getTasks, storeFilteredTasks } from '../actions';

import FilterContainer from "./FilterContainer.js";
import TaskMetrics from "./../components/TaskMetrics.js";

class TaskContainer extends Component {

  componentDidMount() {
    console.log("componendDidMount")
    if (this.props.dateFilter) {
      this.props.getTasks(this.props.dateFilter)
  //    this.props.getTasks('2015-09-28')  // testing only
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componendDidUpdate")
    if (this.props.dateFilter && this.props.dateFilter !== prevProps.dateFilter) {
      this.props.getTasks(this.props.dateFilter)
    }
    // this doesn't work if getTasks is executed, neither does putting filterTasks in prior if{} - only works wen getTasks is not executed - so the STORE_TASKS reducer clears the filters to avoid confusing the user!!!!
    if ((this.props.taskNameFilter !== prevProps.taskNameFilter)
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
    console.log("filter tasks", filtered)
    this.props.storeFilteredTasks(filtered, this.getMetrics(filtered))
  }

  filterMatch = (filter, value) =>
    !filter ? true : filter === value

  getMetrics = (tasks) => {
    return (    {
          tasks: [...new Set(tasks.map(t => t.task.task_name.name))].length,
          jobs: [...new Set(tasks.map(t => t.job.job_num))].length,
          scanners: [...new Set(tasks.filter(t => t.task.task_name.name === 'scan').map(t => t.scanner.name))].length,   // scanner is only relevant for the scan task
          operators: [...new Set(tasks.map(t => t.user.username))].length,
          projects: [...new Set(tasks.map(t => t.task.workflow.project.name))].length
          // need to get sum of duration also
        }
      )
  }

  renderTaskTiles = () => {
    console.log("renderTaskTiles")
    return (
        <Fragment>
          <ol>

        {this.props.filteredTasks.map(jt => {
          return (
            <li key={jt.id}>
                Workflow {jt.task.workflow.name}
                Job# {jt.job.job_num}
                Scanner {jt.scanner.name}
                Task {jt.task.task_name.name}
                User {jt.user.username}
                Status {jt.task_state.name}
                Duration {jt.duration}
            </li>

          )

        })}
      </ol>
        </Fragment>

    )
  }

  render() {
    console.log("TaskContainer render", this.props)
    return (
        <Fragment>
          <div className="task-container">
            <h3>TaskContainer</h3>
            {this.props.filtersLoaded
              ? <FilterContainer parent={'task'}/>
              : null
            }
            <TaskMetrics metrics={this.props.taskMetrics}/>
            {this.renderTaskTiles()}
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
    getTasks: (dateFilter) => dispatch(getTasks(dateFilter)),
    storeFilteredTasks: (filteredTasks, metrics) =>  dispatch(storeFilteredTasks(filteredTasks, metrics)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import TaskListItem from "../components/TaskListItem.js";

import { storeFilteredTasks } from '../actions';

const REFRESH_SCANS_INTERVAL = 9000

class TaskListContainer extends Component {

  componentDidMount() {
    // console.log("componendDidMount")
    this.setupInterval()
    this.filterTasks()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
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

  setupInterval = () => {
    // fetch new task list perodically
    this.interval = setInterval(() => {
      this.refreshImagesScanned()
    }, REFRESH_SCANS_INTERVAL)
  }

  refreshImagesScanned = () => {
    console.log("refresh images scanned")
  }

  getImagesScanned = (img_count, start, finish) => {
    let duration = moment.duration(finish.diff(start)).as('milliseconds')
    let elapsed = moment.duration(moment().diff(start)).as('milliseconds')
    let imagesPerSecond = img_count/duration/1000
    let imagesScanned = Math.round(imagesPerSecond * elapsed * 1000)
    console.log(`duration=${duration/1000}, elapsed=${elapsed/1000}, rate=${imagesPerSecond}, scanned=${imagesScanned}`)
    return imagesScanned
  }

  filterTasks = () => {
    let filtered = this.props.tasks.filter((jt) =>
      this.filterMatch(this.props.taskNameFilter, jt.task.task_name.name)
        && this.filterStatus(this.props.statusFilter, jt)
        && this.filterMatch(parseInt(this.props.jobFilter, 10), jt.job.job_num)
        && this.filterMatch(this.props.userFilter, jt.user.username)
        && this.filterMatch(this.props.projectFilter, jt.task.workflow.project.name)
    )
    // console.log("filter tasks", filtered)
    this.props.storeFilteredTasks(filtered)
  }

  filterMatch = (filter, value) =>
    !filter ? true : filter === value

  filterStatus = (statusFilter, task) => {
    if (!statusFilter) {
      return true
    }
    else {
      let start = moment(task.start_datetime)
      let finish = moment(task.end_datetime)
      let status = task.task_state.name
      let now = moment()

      if (start > now) {
        status = 'pending'
      }
      if (finish < now) {
        status = 'closed'
      }
      if (now > start && now < finish) {
        status = 'active'
      }
      return status === statusFilter ? true : false
    }
  }

  render() {
    // console.log("TaskListContainer render", this.props)
    return (
      <Fragment>
        <div className="task-list">
          <h3>Tasks</h3>
          {this.props.filteredTasks.map(jt => {
            return (
              <TaskListItem key={jt.id} item={jt}
               statusFilter={this.props.statusFilter}
               getImagesScanned={this.getImagesScanned} />
            )
          })}
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

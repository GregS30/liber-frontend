import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getTasks } from '../actions';

import FilterContainer from "./FilterContainer.js";
import TaskListContainer from "./TaskListContainer.js";
import TaskMetricsContainer from "./TaskMetricsContainer.js";

import {REAL_FACTORY, UNREAL_TODAYS_DATE} from '../constants';

const REFRESH_TASKS_INTERVAL = 20000

class TaskContainer extends Component {

  componentDidMount() {
    // console.log("componentDidMount")
    this.setupInterval()
    if (this.props.dateFilter) {
      this.props.getTasks(this.props.dateFilter)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componentDidUpdate")
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

  getImagesScanned = (img_count, start, finish) => {
    let duration = moment.duration(finish.diff(start)).as('milliseconds')
    let elapsed = moment.duration(this.getNow().diff(start)).as('milliseconds')
    let imagesPerSecond = img_count/duration/1000
    let imagesScanned = Math.round(imagesPerSecond * elapsed * 1000)
    // console.log(`duration=${duration/1000}, elapsed=${elapsed/1000}, rate=${imagesPerSecond}, scanned=${imagesScanned}`)
    return imagesScanned
  }

  getNow = () =>
    // If running a real factory, use current date/time to determine
    //  if a task is active; otherwise we have to kludge the current
    //  time into our (unreal) test date, hard-coded in db seeding
    REAL_FACTORY
      ? moment()
      : moment(UNREAL_TODAYS_DATE + "T" + moment().format("HH:mm:ss.SSSSZ"))

  render() {
    // console.log("TaskContainer render", this.props.statusFilter)
    return (
        <Fragment>
          <div className="task-container">
            <div className="page-header"><h2>Tasks</h2></div>
            <div className="task-sidebar">
              {this.props.filtersLoaded
                ? <FilterContainer parent={'task'}/>
                : null
              }
              <TaskMetricsContainer
                getImagesScanned={this.getImagesScanned}
                getNow={this.getNow}
              />
            </div>
            <TaskListContainer
              getImagesScanned={this.getImagesScanned}
              getNow={this.getNow}
            />
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
    statusFilter: state.statusFilter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: (dateFilter) => dispatch(getTasks(dateFilter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

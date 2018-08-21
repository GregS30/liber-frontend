import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import TaskMetrics from "../components/TaskMetrics.js";
import { storeMetrics } from '../actions';

class TaskMetricsContainer extends Component {

  componentDidMount() {
    // console.log("componendDidMount")
      this.props.storeMetrics(this.getMetrics(), this.getScanned())
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componendDidUpdate")
    if (this.props.filteredTasks !== prevProps.filteredTasks) {
      this.props.storeMetrics(this.getMetrics(), this.getScanned())
    }
  }

  getMetrics = () => {
    // console.log("getMetrics()")
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

  getScanned = () => {
    let scanned = 0
    this.props.filteredTasks.forEach((task) => {
      if (task.task.task_name.name === 'scan') {
        this.props.statusFilter === 'active'
        ? scanned = scanned + this.getImagesScanned(task.img_count, moment(task.start_datetime), moment(task.end_datetime))
        : scanned = scanned + task.img_count
      }
    })
    return scanned
  }

  getImagesScanned = (img_count, start, finish) => {
    let duration = moment.duration(finish.diff(start)).as('milliseconds')
    let elapsed = moment.duration(moment().diff(start)).as('milliseconds')
    let imagesPerSecond = img_count/duration/1000
    let imagesScanned = Math.round(imagesPerSecond * elapsed * 1000)
    // console.log(`duration=${duration/1000}, elapsed=${elapsed/1000}, rate=${imagesPerSecond}, scanned=${imagesScanned}`)
    return imagesScanned
  }


  render() {
    // console.log("TaskMetricsContainer render", this.props)
    return (
        <Fragment>
          <h3>Metrics</h3>
          <TaskMetrics metrics={this.props.taskMetrics} scanned={this.props.scanned}/>
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
    scanned: state.scanned,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeMetrics: (metrics, scanned) =>  dispatch(storeMetrics(metrics, scanned)),
    // storeScanned: (scannedImages) =>  dispatch(storeScanned(scannedImages)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskMetricsContainer);

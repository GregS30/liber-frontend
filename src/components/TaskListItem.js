import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// import {REAL_FACTORY, UNREAL_TODAYS_DATE} from '../constants';

const C1_WIDTH = '100px'
const C2_WIDTH = '80px'
const C2_ALIGN = 'right'
const COLOR_STATUS_ACTIVE = '#e06377'

class TaskListItem extends Component {

  renderScanner = (task, scanner, img_count) => {
    // Return scanner name in upper-case only if task is 'scan'
    return (
      task === 'scan'
      ? <tr><td style={{width: C1_WIDTH}} >{scanner.toUpperCase()}</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}></td></tr>
      : null
    )
  }

  renderUser = (user) => {
    return (
      <tr><td style={{width: C1_WIDTH}} >User</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{user}</td></tr>
    )
  }

  renderTask = (task) => {
    // Return task name only if not scan task
    return (
      task !== 'scan'
      ? <tr><td style={{width: C1_WIDTH}}>Task</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{task}</td></tr>
      : null
    )
  }

  getDuration = (currentStatus, start, finish) => {
    let durationString;

    if (currentStatus === 'active') {
      durationString='*';
    }
    else {
      let duration = moment.duration(finish.diff(start))
      durationString = moment.utc(duration.as('milliseconds')).format('HH:mm')
    }

    // Kludge every task duration to show as at least a minute
    if (durationString === '00:00') {
      durationString = '00:01'
    }

    return durationString
  }

  renderStartTime = (startTime) => {
    return (
      <tr><td style={{width: C1_WIDTH}}>Start</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{startTime.format('h:mm')}</td></tr>
    )
  }

  renderJob = (proj_code, job) => {
    return (
      <tr><td style={{width: C1_WIDTH}}>Proj {proj_code}</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{job}</td></tr>
    )
  }

  renderStatusAndDuration = (task) => {
    let start = moment(task.start_datetime)
    let finish = moment(task.end_datetime)
    let status = this.getStatus(task.task_state.name, start, finish)
    let durationString = this.getDuration(status, start, finish)

    if (status === 'active') {
      let imagesScanned = this.props.getImagesScanned(task.img_count, start, finish)
      return (
        <Fragment>
          <tr><td style={{width: C1_WIDTH}}>Status</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{status}</td></tr>
          <tr><td style={{width: C1_WIDTH}}>Duration</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{durationString}</td></tr>
          <tr><td style={{width: C1_WIDTH}}>Images</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{imagesScanned}</td></tr>
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <tr><td style={{width: C1_WIDTH}}>Status</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{status}</td></tr>
          <tr><td style={{width: C1_WIDTH}}>Duration</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{durationString}</td></tr>
          <tr><td style={{width: C1_WIDTH}}>Images</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{task.img_count}</td></tr>
       </Fragment>
      )
    }
  }

  getStatus = (currentStatus, start, finish) => {

    let status = currentStatus
    let now = this.props.getNow()

    if (start > now) {
      status = 'pending'
    }
    if (finish < now) {
      status = 'closed'
    }
    if (now > start && now < finish) {
      status = 'active'
    }

    return status;
  }

  getColor = (task) => {

    let taskStatus = this.getStatus(task.task_state.name, moment(task.start_datetime), moment(task.end_datetime))

    switch(this.props.styleFilter) {

      case 'default':

        return this.props.taskNames.find((name) => name.name === task.task.task_name.name).color

      case 'user':
        return this.props.users.find((user) => user.name === task.user.username).color

      case 'status':
        return this.props.statuses.find((status) => status.name === taskStatus).color

      case 'task':
        return this.props.taskNames.find((name) => name.name === task.task.task_name.name).color

      default:
        return COLOR_STATUS_ACTIVE;

    }
  }

  renderItem = (item) => {
    let backgroundColor = this.getColor(item)
    return (
      <Fragment>
        <div className="task-item">
          <table style={{background: backgroundColor}}>
            <tbody>
              {this.renderScanner(item.task.task_name.name, item.scanner.name, item.img_count)}
              {this.renderStartTime(moment(item.start_datetime))}
              {this.renderJob(item.task.workflow.project.proj_code, item.job.job_num)}
              {this.renderUser(item.user.username)}
              {this.renderTask(item.task.task_name.name)}
              {this.renderStatusAndDuration(item)}
            </tbody>
          </table>
        </div>
      </Fragment>
    )
  }

  render() {
    return(this.renderItem(this.props.item))
  }
}

const mapStateToProps = state => {
  return {
    taskNames: state.taskNames,
    statuses: state.taskStatus,
    users: state.users,
    styleFilter: state.styleFilter,
  }
}

export default connect(mapStateToProps)(TaskListItem);

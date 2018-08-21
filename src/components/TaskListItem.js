import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { storeScanned } from '../actions';

const C1_WIDTH = '100px'
const C2_WIDTH = '80px'
const C2_ALIGN = 'right'
const COLOR = ['#adebeb', '#b3e0ff', '#ccccff', '#b3ecff', '#ccddff', '#e6ccff', '#ffffb3', '#ffcce0', '#ffccff', '#ffc299', '#bbff99']
const COLOR_STATUS_ACTIVE = '#ffff99'
const COLOR_STATUS_CLOSED = 'silver'
const COLOR_STATUS_HOLD = '#ff8080'
const COLOR_STATUS_PENDING = 'white'
const COLOR_SCAN = '#b3ccff'
const COLOR_QA = '#e6ff99'

//
// var divStyle = {
//   color: 'white',
//   backgroundImage: 'url(' + imgUrl + ')',
//   WebkitTransition: 'all', // note the capital 'W' here
//   msTransition: 'all' // 'ms' is the only lowercase vendor prefix
// };
//
// ReactDOM.render(<div style={divStyle}>Hello World!</div>, mountNode);

class TaskListItem extends Component {

  renderScanner = (task, scanner, img_count) => {
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
      // if (this.props.statusFilter === 'active') {
      //   this.props.storeScanned(imagesScanned)
      // }
      return (
        <Fragment>
          <tr><td style={{width: C1_WIDTH}}>Status</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{status}</td></tr>
          <tr><td style={{width: C1_WIDTH}}>Scanning</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{imagesScanned}</td></tr>
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <tr><td style={{width: C1_WIDTH}}>Status</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{status}</td></tr>
          <tr><td style={{width: C1_WIDTH}}>Duration</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{durationString}</td></tr>
        </Fragment>
      )
    }
  }

  getStatus = (currentStatus, start, finish) => {
    let status = currentStatus
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

    return status;
  }

  getColor = (task) => {

    let taskStatus = this.getStatus(task.task_state.name, moment(task.start_datetime), moment(task.end_datetime))

    switch(this.props.styleFilter) {

      case 'default':

        if (task.task.task_name.name === 'scan') {
          return COLOR_SCAN
        }
        else if (task.task.task_name.name === 'qa') {
          return COLOR_QA
        }

        switch(taskStatus) {
          case 'active':
            return COLOR_STATUS_ACTIVE
          case 'closed':
            return COLOR_STATUS_CLOSED
          case 'hold':
            return COLOR_STATUS_HOLD
          case 'pending':
            return COLOR_STATUS_PENDING
          default:
            return COLOR_STATUS_ACTIVE
        }

      case 'user':
        return this.props.users.find((user) => user.name === task.user.username).color

      case 'status':
        return this.props.statuses.find((status) => status.name === taskStatus).color

      case 'task':
        return this.props.taskNames.find((name) => name.name === task.task.task_name.name).color

      default:
        return COLOR[0];

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

const mapDispatchToProps = dispatch => {
  return {
    storeScanned: (scannedImages) =>  dispatch(storeScanned(scannedImages)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListItem);

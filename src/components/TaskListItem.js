import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import Moment from 'moment-react';
import moment from 'moment';

class TaskListItem extends Component {

  renderScanner = (task, scanner) => {
    return (
      task === 'scan'
      ? <tr><td>Scanner</td><td align="right">{scanner}</td></tr>
      : null
    )
  }

  renderUser = (user) => {
    return (
      <tr><td>User</td><td align="right">{user}</td></tr>
    )
  }

  renderTask = (task) => {
    return (
      <tr><td>Task</td><td align="right">{task}</td></tr>
    )
  }

  renderDuration = (start, finish) => {
    let duration = finish.diff(start, 'seconds')
    return (
      <tr><td>Duration</td><td align="right">{duration}</td></tr>
    )
  }

  renderStartTime = (startTime) => {
    return (
      <tr><td>Start</td><td align="right">{startTime.format('h:mm')}</td></tr>
    )
  }

  renderJob = (job) => {
    <tr><td>Job</td><td align="right">{job}</td></tr>
  }

  renderStatus = (start, finish) => {
    let status = 'open'
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

    return (
      <tr><td>Status</td><td align="right">{status}</td></tr>
    )
  }

  renderItem = (item) => {
    return (
      <Fragment>
        <div className="task-item">
          <table>
            <tbody>
              {this.renderScanner(item.task.task_name.name, item.scanner.name)}
              {this.renderStartTime(moment(item.start_datetime))}
              {this.renderJob(item.job.job_num)}
              {this.renderUser(item.user.username)}
              {this.renderTask(item.task.task_name.name)}
              {this.renderStatus(moment(item.start_datetime), moment(item.end_datetime))}
              {this.renderDuration(moment(item.start_datetime), moment(item.end_datetime))}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListItem);

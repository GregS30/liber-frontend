import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import Moment from 'moment-react';
import moment from 'moment';

const C1_WIDTH = '100px'
const C2_WIDTH = '80px'
const C2_ALIGN = 'right'

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

  renderScanner = (task, scanner) => {
    return (
      task === 'scan'
      ? <tr><td style={{width: C1_WIDTH}} >{scanner}</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}></td></tr>
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

  renderDuration = (start, finish) => {
    let duration = moment.duration(finish.diff(start))
    let durationString = moment.utc(duration.as('milliseconds')).format('HH:mm')

    return (
      <tr><td style={{width: C1_WIDTH}}>Duration</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{durationString}</td></tr>
    )
  }

  renderStartTime = (startTime) => {
    return (
      <tr><td style={{width: C1_WIDTH}}>Start</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{startTime.format('h:mm')}</td></tr>
    )
  }

  renderJob = (job) => {
    return (
      <tr><td style={{width: C1_WIDTH}}>Job</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{job}</td></tr>
    )
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
      <tr><td style={{width: C1_WIDTH}}>Status</td><td style={{width: C2_WIDTH, align: C2_ALIGN}}>{status}</td></tr>
    )
  }

  renderItem = (item) => {
    return (
      <Fragment>
        <div className="task-item">
          <table style={{background: '#C0C0C0'}}>
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

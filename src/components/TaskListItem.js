import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import Moment from 'moment-react';
import moment from 'moment';

class TaskListItem extends Component {
  state = {
    email: "",
    password: "",
  }

  renderItem = (item) => {
    let showScanner;

    if (item.task.task_name.name === 'scan') {
      showScanner = <div><label> [scanner] </label>{item.scanner.name}</div>
    }
    else {
      showScanner = null
    }

    let status = 'open'
    let duration = 0

    let now = moment()  
    let start = moment(item.start_datetime);
    let finish = moment(item.end_datetime);

    let showStart = <div><label> [start] </label> {start.format('h:mm')}</div>

    if (start > now) {
      status = 'pending'
    }
    if (finish < now) {
      status = 'closed'
    }
    if (now > start && now < finish) {
      status = 'running'
    }

    let showDuration = null;
    duration = finish.diff(start, 'seconds')
    showDuration = <div><label> [duration] </label> {duration}</div>

    let showStatus = <div><label> [status] </label> {status}</div>

    if (item.id === 227) {
      debugger
    }



    return (
      <li>
        <Fragment>
          {showStart}
          <div><label> [project] </label> {item.task.workflow.project.name}</div>
          <div><label> [job] </label> {item.job.job_num}</div>
          <div><label> [user] </label> {item.user.username}</div>
          <div><label> [task] </label> {item.task.task_name.name}</div>
          {showScanner}
          {showStatus}
          {showDuration}
        </Fragment>
      </li>
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

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Adapter from './../adapters/Adapter'

import { getJobTasks } from '../actions';

import TaskFilterContainer from "./TaskFilterContainer.js";

class TaskContainer extends Component {

  componentDidMount() {
    if (this.props.filterDate) {
      // this.props.getJobTasks(this.props.filterDate)
      this.props.getJobTasks('2015-09-28')  // testing only
    }
  }

  renderTaskTiles = () => {
    return (
        <Fragment>
          <ol>

        {this.props.jobTasks.map(jt => {
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
              <TaskFilterContainer
              />
            {this.renderTaskTiles()}
          </div>
        </Fragment>
      )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    filterDate: state.filterDate,
    jobTasks: state.jobTasks,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getJobTasks: (filterDate) => dispatch(getJobTasks(filterDate)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

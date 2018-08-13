import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Adapter from './../adapters/Adapter'

import { getTasks } from '../actions';

import TaskFilterContainer from "./TaskFilterContainer.js";

class TaskContainer extends Component {

  componentDidMount() {
    if (this.props.dateFilter) {
      this.props.getTasks(this.props.dateFilter)
  //    this.props.getTasks('2015-09-28')  // testing only
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dateFilter && this.props.dateFilter !== prevProps.dateFilter) {
      this.props.getTasks(this.props.dateFilter)
    }
  }

  renderTaskTiles = () => {
    return (
        <Fragment>
          <ol>

        {this.props.tasks.map(jt => {
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
              ? <TaskFilterContainer />
              : null
            }
            {this.renderTaskTiles()}
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
    filtersLoaded: state.filtersLoaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: (dateFilter) => dispatch(getTasks(dateFilter)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

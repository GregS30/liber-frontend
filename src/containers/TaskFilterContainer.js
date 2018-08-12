import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Adapter from './../adapters/Adapter'

import TaskFilter from "./../components/TaskFilter.js";
import DateFilter from "./../components/DateFilter.js";
import ProjectFilter from "./../components/ProjectFilter.js";
import JobFilter from "./../components/JobFilter.js";
import StateFilter from "./../components/StateFilter.js";

import { } from '../actions';

class TaskFilterContainer extends Component {

  render() {
    return (
      <Fragment>
        <div className="task-filter-container">
          <h4>TaskFilterContainer</h4>
          <DateFilter taskDates={this.props.taskDates} />
          <TaskFilter taskNames={this.props.taskNames} />
          <ProjectFilter projects={this.props.projects} />
          <StateFilter taskStates={this.props.taskStates} />
          <JobFilter jobs={this.props.jobs} />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
    taskNames: state.taskNames,
    taskDates: state.taskDates,
    taskStates: state.taskStates,
    jobs: state.jobs,
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskFilterContainer);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Adapter from './../adapters/Adapter'

import TaskFilter from "./../components/TaskFilter.js";
import ProjectFilter from "./../components/ProjectFilter.js";
import JobFilter from "./../components/JobFilter.js";


import { } from '../actions';

class TaskFilterContainer extends Component {

  render() {
    return (
      <Fragment>
        <div className="task-filter-container">
          <h4>TaskFilterContainer</h4>
          <TaskFilter tasks={this.props.tasks} />
          <ProjectFilter projects={this.props.projects} />
          <JobFilter jobs={this.props.jobs} />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
    tasks: state.tasks,
    jobs: state.jobs,
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskFilterContainer);

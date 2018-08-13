import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Adapter from './../adapters/Adapter'

import TaskFilter from "./../components/TaskFilter.js";
import DateFilter from "./../components/DateFilter.js";
import ProjectFilter from "./../components/ProjectFilter.js";
import JobFilter from "./../components/JobFilter.js";
import StatusFilter from "./../components/StatusFilter.js";

import { storeDateSelect, storeTaskNameSelect, storeProjectSelect, storeStatusSelect, storeJobSelect, storeUserSelect } from '../actions';

class TaskFilterContainer extends Component {

  handleDateSelect = (event) =>
    this.props.storeDateSelect(event.target.value)

  handleTaskNameSelect = (event) => this.props.storeTaskNameSelect(event.target.value)

  handleProjectSelect = (event) => this.props.storeProjectSelect(event.target.value)

  handleStatusSelect = (event) =>
    this.props.storeStatusSelect(event.target.value)

  handleJobSelect = (event) =>
    this.props.storeJobSelect(event.target.value)

  render() {
    return (
      <Fragment>
        <div className="task-filter-container">
          <h4>TaskFilterContainer</h4>
          <DateFilter
            taskDates={this.props.taskDates}
            selectedDate={this.props.dateFilter}
            handleDateSelect={this.handleDateSelect} />
          <TaskFilter
            taskNames={this.props.taskNames}
            selectedTaskName={this.props.taskNameFilter}
            handleTaskNameSelect={this.handleTaskNameSelect} />
          <ProjectFilter
            projects={this.props.projects}
            selectedProject={this.props.projectFilter}
            handleProjectSelect={this.handleProjectSelect} />
          <StatusFilter
            taskStatus={this.props.taskStatus}
            selectedStatus={this.props.statusFilter}
            handleStatusSelect={this.handleStatusSelect} />
          <JobFilter
            jobs={this.props.jobs}
            selectedJob={this.props.jobFilter}
            handleJobSelect={this.handleJobSelect} />
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
    taskStatus: state.taskStatus,
    jobs: state.jobs,
    dateFilter: state.dateFilter,
    taskNameFilter: state.taskNameFilter,
    projectFilter: state.projectFilter,
    statusFilter: state.statusFilter,
    jobFilter: state.jobFilter,
    userFilter: state.userFilter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeDateSelect: (selectedDate) => dispatch(storeDateSelect(selectedDate)),
    storeTaskNameSelect: (selectedTaskName) => dispatch(storeTaskNameSelect(selectedTaskName)),
    storeJobSelect: (selectedJob) => dispatch(storeJobSelect(selectedJob)),
    storeProjectSelect: (selectedProject) => dispatch(storeProjectSelect(selectedProject)),
    storeStatusSelect: (selectedStatus) => dispatch(storeStatusSelect(selectedStatus)),
    storeUserSelect: (selectedUser) => dispatch(storeUserSelect(selectedUser)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskFilterContainer);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import TaskFilter from "./../components/filters/TaskFilter.js";
import DateFilter from "./../components/filters/DateFilter.js";
import ProjectFilter from "./../components/filters/ProjectFilter.js";
import JobFilter from "./../components/filters/JobFilter.js";
import StatusFilter from "./../components/filters/StatusFilter.js";
import UserFilter from "./../components/filters/UserFilter.js";
import ClientFilter from "./../components/filters/ClientFilter.js";
import WorkflowFilter from "./../components/filters/WorkflowFilter.js";

import { storeDateSelect, storeTaskNameSelect, storeProjectSelect, storeStatusSelect, storeJobSelect, storeUserSelect, storeClientSelect, storeWorkflowSelect } from '../actions';

class FilterContainer extends Component {

  handleDateSelect = (event) =>
    this.props.storeDateSelect(event.target.value)

  handleTaskNameSelect = (event) => this.props.storeTaskNameSelect(event.target.value)

  handleProjectSelect = (event) => this.props.storeProjectSelect(event.target.value)

  handleStatusSelect = (event) =>
    this.props.storeStatusSelect(event.target.value)

  handleJobSelect = (event) =>
    this.props.storeJobSelect(event.target.value)

  handleClientSelect = (event) =>
    this.props.storeClientSelect(event.target.value)

  handleWorkflowSelect = (event) =>
    this.props.storeWorkflowSelect(event.target.value)

  handleUserSelect = (event) =>
    this.props.storeUserSelect(event.target.value)

  render() {
    return (
      <Fragment>
        <div className="task-filter-container">
          <h4>FilterContainer</h4>

          {this.props.parent === 'task'
          ? <DateFilter
            taskDates={this.props.dates}
            selectedDate={this.props.dateFilter}
            handleDateSelect={this.handleDateSelect} />
          : null}

          {this.props.parent === 'task'
          ? <TaskFilter
            taskNames={this.props.taskNames}
            selectedTaskName={this.props.taskNameFilter}
            handleTaskNameSelect={this.handleTaskNameSelect} />
          : null}

          {this.props.parent === 'analytics' || this.props.parent === 'workflow'
          ? <ClientFilter
            clients={this.props.clients}
            selectedClient={this.props.clientFilter}
            handleClientSelect={this.handleClientSelect} />
          : null}

          {this.props.parent === 'task' || this.props.parent === 'workflow' || this.props.parent === 'analytics'
          ? <ProjectFilter
            projects={this.props.projects}
            selectedProject={this.props.projectFilter}
            handleProjectSelect={this.handleProjectSelect} />
          : null}

          {this.props.parent === 'task'
          ? <StatusFilter
            taskStatus={this.props.status}
            selectedStatus={this.props.statusFilter}
            handleStatusSelect={this.handleStatusSelect} />
          : null}

          {this.props.parent === 'task'
          ? <JobFilter
            jobs={this.props.jobs}
            selectedJob={this.props.jobFilter}
            handleJobSelect={this.handleJobSelect} />
          : null}

          {this.props.parent === 'task'
          ? <UserFilter
            users={this.props.users}
            selectedUser={this.props.jobFilter}
            handleUserSelect={this.handleUserSelect} />
          : null}

          {this.props.parent === 'workflow'
          ? <WorkflowFilter
            workflows={this.props.workflows}
            selectedWorkflow={this.props.workflowFilter}
            handleWorkflowSelect={this.handleWorkflowSelect} />
          : null}

        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
    taskNames: state.taskNames,
    dates: state.taskDates,
    status: state.taskStatus,
    jobs: state.jobs,
    clients: state.clients,
    users: state.users,
    workflows: state.workflows,
    dateFilter: state.dateFilter,
    taskNameFilter: state.taskNameFilter,
    projectFilter: state.projectFilter,
    statusFilter: state.statusFilter,
    jobFilter: state.jobFilter,
    userFilter: state.userFilter,
    clientFilter: state.clientFilter,
    workflowFilter: state.workflowFilter,

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
    storeClientSelect: (selectedClient) => dispatch(storeClientSelect(selectedClient)),
    storeWorkflowSelect: (selectedWorkflow) => dispatch(storeWorkflowSelect(selectedWorkflow)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);

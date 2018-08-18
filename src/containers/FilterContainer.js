import React, { Component } from 'react';
import { connect } from 'react-redux';

import DateFilter from "./../components/filters/DateFilter.js";
import JobFilter from "./../components/filters/JobFilter.js";
import UserFilter from "./../components/filters/UserFilter.js";
import PeriodFilter from "./../components/filters/PeriodFilter.js";
import GenericFilter from "./../components/filters/GenericFilter.js";

import { storeDateSelect, storeTaskNameSelect, storeProjectSelect, storeStatusSelect, storeJobSelect, storeUserSelect, storeClientSelect, storeWorkflowSelect, storeStyleSelect, storePeriodSelect, storeChartSelect } from '../actions';

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

  handleStyleSelect = (event) =>
    this.props.storeStyleSelect(event.target.value)

  handlePeriodSelect = (event) =>
    this.props.storePeriodSelect(event.target.value)

  handleChartSelect = (event) =>
    this.props.storeChartSelect(event.target.value)

  render() {
    return (
      <div className="filters-container">
        <h3>Filters</h3>

        {this.props.parent === 'analytics'
        ? <PeriodFilter
          periods={this.props.periods}
          selectedPeriods={this.props.periodFilter}
          handlePeriodsSelect={this.handlePeriodsSelect} />
        : null}

        {this.props.parent === 'analytics'
        ? <GenericFilter
          label='Chart'
          items={this.props.charts}
          selectedItem={this.props.chartFilter}
          handleSelect={this.handleChartSelect} />
        : null}

        {this.props.parent === 'task'
        ? <DateFilter
          taskDates={this.props.dates}
          selectedDate={this.props.dateFilter}
          handleDateSelect={this.handleDateSelect} />
        : null}

        {this.props.parent === 'workflow'
        ? <GenericFilter
          label='Client'
          items={this.props.clients}
          selectedItem={this.props.clientFilter}
          handleSelect={this.handleClientSelect} />
        : null}

        {this.props.parent === 'task' || this.props.parent === 'workflow' || this.props.parent === 'analytics'
        ? <GenericFilter
          label={'Project'}
          items={this.props.projects}
          selectedItem={this.props.projectFilter}
          handleSelect={this.handleProjectSelect} />
        : null}

        {this.props.parent === 'task' || this.props.parent === 'analytics'
        ? <GenericFilter
          label='Task'
          items={this.props.taskNames}
          selectedItem={this.props.taskNameFilter}
          handleSelect={this.handleTaskNameSelect} />
        : null}

        {this.props.parent === 'task'
        ? <GenericFilter
          label='Status'
          items={this.props.status}
          selectedItem={this.props.statusFilter}
          handleSelect={this.handleStatusSelect} />
        : null}

        {this.props.parent === 'task'
        ? <JobFilter
          jobs={this.props.jobs}
          selectedJob={this.props.jobFilter}
          handleJobSelect={this.handleJobSelect} />
        : null}

        {this.props.parent === 'task' || this.props.parent === 'analytics'
        ? <UserFilter
          users={this.props.users}
          selectedUser={this.props.userFilter}
          handleUserSelect={this.handleUserSelect} />
        : null}

        {this.props.parent === 'workflow'
        ? <GenericFilter
          label='Workflow'
          items={this.props.workflows}
          selectedItem={this.props.workflowFilter}
          handleSelect={this.handleWorkflowSelect} />
        : null}

        {this.props.parent === 'task'
        ? <GenericFilter
          label='Style'
          items={this.props.styles}
          selectedItem={this.props.styleFilter}
          handleSelect={this.handleStyleSelect} />
        : null}

        {this.props.parent === 'analytics'
        ? <button onClick={this.props.chartIt}>Chart It!</button>
        : null}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    styles: state.styles,
    projects: state.projects,
    taskNames: state.taskNames,
    dates: state.taskDates,
    status: state.taskStatus,
    jobs: state.jobs,
    clients: state.clients,
    users: state.users,
    periods: state.periods,
    workflows: state.workflows,
    charts: state.charts,
    dateFilter: state.dateFilter,
    taskNameFilter: state.taskNameFilter,
    projectFilter: state.projectFilter,
    statusFilter: state.statusFilter,
    jobFilter: state.jobFilter,
    userFilter: state.userFilter,
    clientFilter: state.clientFilter,
    workflowFilter: state.workflowFilter,
    periodFilter: state.periodFilter,
    chartFilter: state.chartFilter,
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
    storeStyleSelect: (selectedStyle) => dispatch(storeStyleSelect(selectedStyle)),
    storePeriodSelect: (selectedPeriod) => dispatch(storePeriodSelect(selectedPeriod)),
    storeChartSelect: (selectedChart) => dispatch(storeChartSelect(selectedChart)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);

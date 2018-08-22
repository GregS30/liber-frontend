import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { storeFilteredWorkflows, setTaskRender } from '../actions';

import WorkflowTask from "../components/WorkflowTask.js";

class WorkflowListContainer extends Component {

  componentDidMount() {
    // console.log("componendDidMount")
    if (this.props.filtersLoaded) {
      this.filterWorkflows()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componendDidUpdate")
    if ((this.props.clientFilter !== prevProps.clientFilter)
      || (this.props.projectFilter !== prevProps.projectFilter)
      || (this.props.workflowFilter !== prevProps.workflowFilter)
    ) {
      this.filterWorkflows()
    }
  }

  filterWorkflows = () => {
    let filtered = this.props.workflowTasks.filter((wt) =>
      this.filterMatch(this.props.clientFilter, wt.client_name)
      && this.filterMatch(this.props.projectFilter, wt.project_name)
      && this.filterMatch(this.props.workflowFilter, wt.workflow_name)
    )
    console.log("filter workflows", filtered)
    this.props.storeFilteredWorkflows(filtered)
  }

  filterMatch = (filter, value) =>
    !filter ? true : filter === value

  render() {
    // console.log("WorkflowListContainer render", this.props)
    return (
      <Fragment>
        <div className="workflow-task-list">
          <h3>Workflows</h3>
          {this.props.filteredWorkflowTasks.map(jt => {
            return (
              <WorkflowTask key={jt.id} item={jt}
               statusFilter={this.props.statusFilter}
               getImagesScanned={this.getImagesScanned} />
            )
          })}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    projectFilter: state.projectFilter,
    clientFilter: state.clientFilter,
    workflowFilter: state.workflowFilter,
    workflowTasks: state.workflowTasks,
    filteredWorkflowTasks: state.filteredWorkflowTasks,
    filtersLoaded: state.filtersLoaded,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeFilteredWorkflows: (filteredWorkflowTasks) =>  dispatch(storeFilteredWorkflows(filteredWorkflowTasks)),
    setTaskRender: (flag) => dispatch(setTaskRender(flag)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowListContainer);

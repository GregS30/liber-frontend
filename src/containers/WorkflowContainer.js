import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Adapter from './../adapters/Adapter'

import { setWorkflowFilters, getWorkflows } from '../actions';

import FilterContainer from "./FilterContainer.js";
import WorkflowListContainer from "./WorkflowListContainer.js";

const DEFAULT_CLIENT = 'Liber Alchemy'
const DEFAULT_PROJECT = '_prototype'
const DEFAULT_WORKFLOW = '_prototype'

class WorkflowContainer extends Component {

  componentDidMount() {
    console.log("componendDidMount")
    if (this.props.filtersLoaded) {
      this.props.getWorkflows(true,
        this.getFilterId(DEFAULT_CLIENT, this.props.clients),
        this.getFilterId(DEFAULT_PROJECT, this.props.projects),
        this.getFilterId(DEFAULT_WORKFLOW, this.props.workflows)
      )
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componendDidUpdate")
    if ((this.props.clientFilter !== prevProps.clientFilter)
      || (this.props.projectFilter !== prevProps.projectFilter)
      || (this.props.workflowFilter !== prevProps.workflowFilter)
    ) {

      this.props.getWorkflows(false,
        this.getFilterId(this.props.clientFilter, this.props.clients),
        this.getFilterId(this.props.projectFilter, this.props.projects),
        this.getFilterId(this.props.workflowFilter, this.props.workflows)
      )
    }
  }

  getFilterId = (userInput, filterList) =>
    // if the user made no selection, then userInput is a blank string
    userInput ? filterList.find((item) => item.name === userInput).id : ''

  renderWorkflowLists = () => {
    return (
      this.props.workflowTasks.map((wt) => {
        return (
          <WorkflowListContainer
            clientFilter={this.props.clientFilter}
            workflow={wt.workflow} 
            taskList={wt.tasks}/>
        )
      })
    )
  }

  render() {
  // console.log("TaskContainer render", this.props)
    return (
      <Fragment>
        <div className="workflow-container">
          <div className="page-header"><h2>Workflows</h2></div>
          <div className="workflow-sidebar">
            {this.props.filtersLoaded
              ? <FilterContainer parent={'workflow'}/>
              : null
            }
          </div>
          <div className="workflow-lists-container">
            {this.renderWorkflowLists()}
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    filtersLoaded: state.filtersLoaded,
    clients: state.clients,
    projects: state.projects,
    workflows: state.workflows,
    workflowTasks: state.workflowTasks,
    clientFilter: state.clientFilter,
    projectFilter: state.projectFilter,
    workflowFilter: state.workflowFilter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setWorkflowFilters: () =>  dispatch(setWorkflowFilters()),
    getWorkflows: (onLoad, clientId, projectId, workflowId) =>  dispatch(getWorkflows(onLoad, clientId, projectId, workflowId)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WorkflowContainer);

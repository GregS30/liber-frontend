import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Adapter from './../adapters/Adapter'

import ClientFilter from "./../components/ClientFilter.js";
import ProjectFilter from "./../components/ProjectFilter.js";
import WorkflowFilter from "./../components/WorkflowFilter.js";

import { } from '../actions';

class WorkflowFilterContainer extends Component {

  render() {
    console.log("workflowcontainer", this.props)
    return (
      <Fragment>
        <div className="workflow-filter-container">
          <h4>WorkflowFilterContainer</h4>
          <ClientFilter clients={this.props.clients} />
          <ProjectFilter projects={this.props.projects} />
          <WorkflowFilter workflows={this.props.workflows} />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
    clients: state.clients,
    workflows: state.workflows,
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WorkflowFilterContainer);

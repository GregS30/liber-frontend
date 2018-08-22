import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Adapter from './../adapters/Adapter'

import { setWorkflowFilters, getWorkflows } from '../actions';

import FilterContainer from "./FilterContainer.js";
import WorkflowListContainer from "./WorkflowListContainer.js";

class WorkflowContainer extends Component {

  componentDidMount() {
    if (this.props.filtersLoaded) {
      this.props.getWorkflows()
    }
  }

  render() {
  // console.log("TaskContainer render", this.props)
    return (
      <Fragment>
        <div className="workflow-container">
          <div className="workflow-sidebar">
            {this.props.filtersLoaded
              ? <FilterContainer parent={'workflow'}/>
              : null
            }
          </div>
          <WorkflowListContainer />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    filtersLoaded: state.filtersLoaded,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setWorkflowFilters: () =>  dispatch(setWorkflowFilters()),
    getWorkflows: () =>  dispatch(getWorkflows()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WorkflowContainer);

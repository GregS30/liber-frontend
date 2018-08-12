import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Adapter from './../adapters/Adapter'

import { } from '../actions';

import WorkflowFilterContainer from "./WorkflowFilterContainer.js";


class WorkflowContainer extends Component {

  render() {
    return (
      <Fragment>
        <div className="workflow-container">
          <h3>WorkflowContainer</h3>
            <WorkflowFilterContainer/>

        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WorkflowContainer);

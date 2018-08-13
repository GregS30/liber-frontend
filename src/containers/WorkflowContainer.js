import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Adapter from './../adapters/Adapter'

import { } from '../actions';

import FilterContainer from "./FilterContainer.js";


class WorkflowContainer extends Component {

  render() {
    return (
      <Fragment>
        <div className="workflow-container">
          <h3>WorkflowContainer</h3>
            <FilterContainer parent='workflow'/>
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

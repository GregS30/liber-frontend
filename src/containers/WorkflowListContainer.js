import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import { } from '../actions';

import WorkflowTask from "../components/WorkflowTask.js";

class WorkflowListContainer extends Component {

  render() {
    console.log("WorkflowListContainer render", this.props)
    return (
      <Fragment>
        <div className="workflow-task-list">
          <h3>Workflows</h3>
          {this.props.workflowTasks.map(wt => {
            return (
              <WorkflowTask key={wt.task_id} item={wt}
              />
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
    workflowTasks: state.workflowTasks,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowListContainer);

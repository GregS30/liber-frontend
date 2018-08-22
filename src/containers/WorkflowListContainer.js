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
          <h4>{this.props.workflow.project_name}</h4>
          {this.props.taskList.map(tl => {
            return (
              <WorkflowTask key={tl.task_id} item={tl}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowListContainer);

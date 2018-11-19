import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import WorkflowTask from "../components/WorkflowTask.js";

class WorkflowListContainer extends Component {

  getHeadProjectName = (name) =>
    name.length > 8 ? name.slice(0, name.indexOf(' ', 8)+1) : name

  render() {
    console.log("WorkflowListContainer render", this.props)
    return (
      <Fragment>
        <div className="workflow-task-list">
          <div className="workflow-task-head">
            {this.props.workflow.client_name}<br></br>
            {this.props.workflow.project_name}<br></br>
            {this.props.workflow.proj_code}<br></br>
          </div>
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

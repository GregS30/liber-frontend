import React from 'react';

const WorkflowFilter = (props) => {

  return (
    <div className="workflow-filter">
      <label htmlFor="workflow-filter">Workflow: </label>
      <select
        name="workflow-filter"
        value={props.selectedWorkflow}
        onChange={props.handleWorkflowSelect}
        >
        {props.workflows.map(workflow =>
            <option key={workflow.id}>{workflow.name}</option>
        )}
        </select>
    </div>
  )

}

export default WorkflowFilter;

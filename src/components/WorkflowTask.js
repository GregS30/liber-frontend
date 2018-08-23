import React, { Fragment } from 'react';

const C1_WIDTH = '100px';

const WorkflowTask = (props) => {
  return (
    <Fragment>
      <div className="workflow-task">
        <table style={{background: props.item.task_color}}>
          <tbody>
            <Fragment>
              <tr><td className="task-id" style={{width: C1_WIDTH}}>{props.item.task_id}</td></tr>
              <tr><td style={{width: C1_WIDTH}}>{props.item.task_name}</td></tr>
            </Fragment>
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

export default WorkflowTask;

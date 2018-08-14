import React from 'react';

const TaskMetrics = (props) => {

  return (
    <div className="task-metrics">
    {props.metrics
      ?
      <ul>
        <li key='tasks'>{props.metrics.tasks} tasks</li>
        <li key='jobs'>{props.metrics.jobs} jobs</li>
        <li key='scanners'>{props.metrics.scanners} scanners</li>
        <li key='operators'>{props.metrics.operators} operators</li>
        <li key='projects'>{props.metrics.projects} projects</li>
      </ul>
      : null
    }
    </div>
  )

}

export default TaskMetrics;

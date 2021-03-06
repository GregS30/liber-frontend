import React from 'react';

const TaskMetrics = (props) => {
  return (
    <div className="task-metrics-container">
    {props.metrics
      ?
      <table className="task-metrics-table">
        <tbody>
          <tr>
            <td>Time</td>
            <td align="right">{props.getNow().format("hh:mm:ss")}</td>
          </tr>
          <tr>
            <td>Tasks</td>
            <td align="right">{props.metrics.tasks}</td>
          </tr>
          <tr>
            <td>Jobs</td>
            <td align="right">{props.metrics.jobs}</td>
          </tr>
          <tr>
            <td>Scanners</td>
            <td align="right">{props.metrics.scanners}</td>
          </tr>
          <tr>
            <td>Operators</td>
            <td align="right">{props.metrics.operators}</td>
          </tr>
          <tr>
            <td>Projects</td>
            <td align="right">{props.metrics.projects}</td>
          </tr>
          <tr>
            <td>Scanned</td>
            <td align="right">{props.scanned.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
        </tbody>
      </table>
      : null
    }
    </div>
  )
}

export default TaskMetrics;

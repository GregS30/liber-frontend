import React from 'react';

const ChartMetrics = (props) => {
  return (
    <div className="task-metrics-container">
    {props.metrics
      ?
      <table className="task-metrics-table">
        <tbody>
          <tr>
            <td>Images</td>
            <td align="right">{(props.metrics.images).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
          <tr>
            <td>Jobs</td>
            <td align="right">{props.metrics.jobs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
          <tr>
            <td>Tasks</td>
            <td align="right">{props.metrics.tasks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
          <tr>
            <td>Scanners</td>
            <td align="right">{props.metrics.scanners}</td>
          </tr>
          <tr>
            <td>Operators</td>
            <td align="right">{props.metrics.users}</td>
          </tr>
          <tr>
            <td>Projects</td>
            <td align="right">{props.metrics.projects}</td>
          </tr>
        </tbody>
      </table>
      : null
    }
    </div>
  )
}

export default ChartMetrics;

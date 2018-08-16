import React from 'react';

const JobFilter = (props) => {

  return (
    <div classname="filter">
      <label className="filter-label" htmlFor="job-filter">Job: </label>
      <select
        name="job-filter"
        value={props.selectedJob}
        onChange={props.handleJobSelect}
        >
        {props.jobs.map(job =>
          <option key={job.id}>{job.job_num}</option>
        )}
        </select>
    </div>
  )

}

export default JobFilter;

import React from 'react';

const StatusFilter = (props) => {

  return (
    <div classname="filter">
      <label className="filter-label" htmlFor="state-filter">Status: </label>
      <select
        name="state-filter"
        value={props.selectedStatus}
        onChange={props.handleStatusSelect}
        >
        {props.taskStatus.map(status =>
            <option key={status.id}>{status.name}</option>
        )}
        </select>
    </div>
  )

}

export default StatusFilter;

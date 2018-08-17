import React from 'react';

const DateFilter = (props) => {
  return (
    <div className="filter">
    <label className="filter-label" htmlFor="date-filter">Date: </label>
    <select
      className="filter-select"
      name="date-filter"
      value={props.selectedDate}
      onChange={props.handleDateSelect}
      >
      {props.taskDates.map(dateValue =>
          <option key={dateValue}>{dateValue}</option>
      )}
      </select>
    </div>
  )

}

export default DateFilter;

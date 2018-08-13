import React from 'react';

const DateFilter = (props) => {
  console.log("DateFilter", props)
  return (
    <div className="date-filter">
      <label htmlFor="date-filter">Task Date: </label>
      <select
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

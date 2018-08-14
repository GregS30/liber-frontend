import React from 'react';

const PeriodFilter = (props) => {
  console.log("PeriodFilter", props)
  return (
    <div className="period-filter">
      <label htmlFor="period-filter">Period: </label>
      <select
        name="period-filter"
        value={props.selectedPeriod}
        onChange={props.handlePeriodSelect}
        >
        {props.taskPeriods.map(period =>
            <option key={period}>{period}</option>
        )}
        </select>
    </div>
  )

}

export default PeriodFilter;

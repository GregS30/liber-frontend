import React from 'react';

const StateFilter = (props) => {

  return (
    <div className="state-filter">
      <label htmlFor="state-filter">State: </label>
      <select
        name="state-filter"
        value={props.selectedState}
        onChange={props.handleStateSelect}
        >
        {props.taskStates.map(state =>
            <option key={state.id}>{state.name}</option>
        )}
        </select>
    </div>
  )

}

export default StateFilter;

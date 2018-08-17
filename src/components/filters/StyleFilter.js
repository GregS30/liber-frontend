import React from 'react';

const StyleFilter = (props) => {

  return (
    <div className="filter">
      <label className="filter-label" htmlFor="task-style-filter">Style: </label>
      <select
        name="task-style-filter"
        value={props.selectedStyle}
        onChange={props.handleStyleSelect}
        >
        {props.taskStyles.map(taskStyle =>
            <option key={taskStyle.id}>{taskStyle.name}</option>
        )}
        </select>
    </div>
  )

}

export default StyleFilter;

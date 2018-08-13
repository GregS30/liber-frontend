import React from 'react';

const TaskFilter = (props) => {

  return (
    <div className="task-filter">
      <label htmlFor="task-filter">Task: </label>
      <select
        name="task-filter"
        value={props.selectedTaskName}
        onChange={props.handleTaskNameSelect}
        >
        {props.taskNames.map(task =>
            <option key={task.id}>{task.name}</option>
        )}
        </select>
    </div>
  )

}

export default TaskFilter;

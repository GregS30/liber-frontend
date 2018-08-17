import React from 'react';

const ProjectFilter = (props) => {

  return (
    <div className="filter">
      <label className="filter-label" htmlFor="project-filter">Project: </label>
      <select
        className="filter-select"
        name="project-filter"
        value={props.selectedProject}
        onChange={props.handleProjectSelect}
        >
        {props.projects.map(project =>
            <option key={project.id}>{project.name}</option>
        )}
        </select>

    </div>
  )

}

export default ProjectFilter;

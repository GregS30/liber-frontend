import React from 'react';

const GenericFilter = (props) => {

    // use for any filter with generic attributes id and name

    return (
    <div className="filter">
      <label className="filter-label" htmlFor="generic-filter">{props.label}: </label>
      <select
        name="generic-filter"
        value={props.selectedItem}
        onChange={props.handleSelect}
        >
        {props.items.map(item =>
            <option key={item.id}>{item.name}</option>
        )}
        </select>
    </div>
  )

}

export default GenericFilter;

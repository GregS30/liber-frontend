import React from 'react';

const ClientFilter = (props) => {

  return (
    <div className="filter">
      <label className="filter-label" htmlFor="task-style-filter">Client: </label>
      <select
        name="task-style-filter"
        value={props.selectedClient}
        onChange={props.handleClientSelect}
        >
        {props.clients.map(client =>
            <option key={client.id}>{client.name}</option>
        )}
        </select>
    </div>
  )

}

export default ClientFilter;

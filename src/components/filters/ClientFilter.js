import React from 'react';

const ClientFilter = (props) => {

  return (
    <div className="filter">
      <label className="filter-label" htmlFor="client-filter">Client: </label>
      <select
        name="client-filter"
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

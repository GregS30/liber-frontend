import React from 'react';

const UserFilter = (props) => {

  return (
    <div className="filter">
      <label className="filter-label" htmlFor="user-filter">User: </label>
      <select
        name="user-filter"
        value={props.selectedUser}
        onChange={props.handleUserSelect}
        >
        {props.users.map(user =>
            <option key={user.id}>{user.username}</option>
        )}
        </select>
    </div>
  )

}

export default UserFilter;

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import TaskListItem from "../components/TaskListItem.js";

// import { storeFilteredTasks } from '../actions';

class ReportContainer extends Component {

  componentDidMount() {
    // console.log("componendDidMount")
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componendDidUpdate")
  }

  render() {
    // console.log("ReportContainer render", this.props)
    return (
      <Fragment>
        <div className="task-list">
          <h3>Chart</h3>
          {this.props.filteredTasks.map(jt => {
            return (
              <TaskListItem key={jt.id} item={jt} />
            )
          })}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    // isFetching: state.isFetching,
    // taskNameFilter: state.taskNameFilter,
    // projectFilter: state.projectFilter,
    // statusFilter: state.statusFilter,
    // jobFilter: state.jobFilter,
    // userFilter: state.userFilter,
    // dateFilter: state.dateFilter,
    // tasks: state.tasks,
    filteredTasks: state.filteredTasks,
    // filtersLoaded: state.filtersLoaded,
    // taskMetrics: state.taskMetrics,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // storeFilteredTasks: (filteredTasks) =>  dispatch(storeFilteredTasks(filteredTasks)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);

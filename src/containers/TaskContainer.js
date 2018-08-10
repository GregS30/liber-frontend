import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Adapter from './../adapters/Adapter'

import { getFilters } from '../actions';

import TaskFilterContainer from "./TaskFilterContainer.js";

class TaskContainer extends Component {

  render() {
    console.log("TaskContainer render", this.props)
    return (
        <Fragment>
          <div className="task-container">
            <h3>TaskContainer</h3>
              <TaskFilterContainer
              />
          </div>
        </Fragment>
      )
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Adapter from './../adapters/Adapter'

import ClientFilter from "./../components/ClientFilter.js";
import ProjectFilter from "./../components/ProjectFilter.js";

import { } from '../actions';

class AnalyticsFilterContainer extends Component {

  render() {
    return (
      <Fragment>
        <div className="analytics-filter-container">
          <h4>AnalyticsFilterContainer</h4>
          <ClientFilter clients={this.props.clients} />
          <ProjectFilter projects={this.props.projects} />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
    clients: state.clients,
  }
}


const mapDispatchToProps = dispatch => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsFilterContainer);

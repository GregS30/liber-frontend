import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Adapter from './../adapters/Adapter'

import { } from '../actions';

import AnalyticsFilterContainer from "./AnalyticsFilterContainer.js";


class AnalyticsContainer extends Component {

  render() {
    return (
      <Fragment>
        <div className="analytics-container">
          <h3>AnalyticsContainer</h3>
            <AnalyticsFilterContainer/>

        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);

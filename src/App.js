import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Adapter from './adapters/Adapter';

import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

import TaskContainer from "./containers/TaskContainer.js";
import WorkflowContainer from "./containers/WorkflowContainer.js";
import AnalyticsContainer from "./containers/AnalyticsContainer.js";

import { clearUser, clearState, getCurrentUser, getFilters } from './actions';

class App extends Component {

  componentDidMount() {
    this.props.getCurrentUser()
    this.props.getFilters()
  }

  handleLogout = () => {
    Adapter.deleteToken();
    this.props.clearUser();
    this.props.clearState();
    this.props.history.push('/');
  }

  render() {
   console.log("App container render()", this.props)
    return (
      <div className="App">
          <Fragment>
            <div className="header-nav">
              <Header />
              <Navbar
                username={this.props.username}
                handleLogout={this.handleLogout}
              />
            </div>
            <div className="app-task">
              <Route
                exact path="/tasks"
                render={() =>
                  <TaskContainer />}
              />
            </div>
            <div className="app-workflow">
              <Route
                exact path="/workflows"
                render={() =>
                  <WorkflowContainer />}
              />
            </div>
            <div className="app-analytics">
              <Route
                exact path="/analytics"
                render={() =>
                  <AnalyticsContainer />}
              />
            </div>

          </Fragment>
        <Footer />
      </div>
    );
  }
}

// redux props
const mapStateToProps = state => {
  return {
    username: state.username,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearUser: () => dispatch(clearUser()),
    clearState: () => dispatch(clearState()),
    getCurrentUser: () => dispatch(getCurrentUser()),
    getFilters: () => dispatch(getFilters()),
  }
}

// see github "withRouter not working if inside redux connect #5256"
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

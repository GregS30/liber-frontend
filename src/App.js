import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// css
import './App.css';

// adapters
import Adapter from './adapters/Adapter';

// components
import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

import TaskContainer from "./containers/TaskContainer.js";
import WorkflowContainer from "./containers/WorkflowContainer.js";
import AnalyticsContainer from "./containers/AnalyticsContainer.js";

// actions
import { clearUser, getCurrentUser, getFilters } from './actions';

class App extends Component {

  // auto-login - if token is present in LocalStorage
  componentDidMount() {
    this.props.getCurrentUser()
    this.props.getFilters()
    console.log("component did mount")
  }

  // these have to be in our reducer

  handleLogout = () => {
    Adapter.deleteToken();
    this.props.clearUser();
    this.props.history.push('/');
  }

  render() {
   console.log("App username", this.props.username)
    return (
      <div className="App">
          <Fragment>
            <div className="header-nav">
              <Header />
              <Navbar
                username={this.props.username}
                handleLogout={this.handleLogout}
                loggedIn={this.props.loggedIn}
              />
            </div>
            <div className="app-task">
              <Route
                exact path="/task"
                render={() =>
                  <TaskContainer />}
              />
            </div>
            <div className="app-workflow">
              <Route
                exact path="/workflow"
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
    userId: state.userId,
    loggedIn: state.loggedIn,
    isFetching: state.isFetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearUser: () => dispatch(clearUser()),
    getCurrentUser: () => dispatch(getCurrentUser()),
    getFilters: () => dispatch(getFilters()),
  }
}

// see github "withRouter not working if inside redux connect #5256"
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

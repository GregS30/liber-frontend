import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// css
import './App.css';

// adapters
import Adapter from './adapters/Adapter';

// components
import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

// actions
import { storeUser, clearUser, getCurrentUser } from './actions';

class App extends Component {

  // auto-login - if token is present in LocalStorage
  componentDidMount() {
    this.props.getCurrentUser()
  }

  // these have to be in our reducer

  handleLogout = () => {
    Adapter.deleteToken();
    this.props.clearUser();
    this.props.history.push('/');
  }

  render() {
   console.log("App render", this.props)
    return (
      <div className="App">
          <Fragment>
            <div className="header-nav">
              <Header />
              <Navbar
                handleLogout={this.handleLogout}
                loggedIn={this.props.loggedIn}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeUser: (username, userId) => dispatch(storeUser(username, userId)),
    clearUser: () => dispatch(clearUser()),
    getCurrentUser: () => dispatch(getCurrentUser()),
  }
}

// see github "withRouter not working if inside redux connect #5256"
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

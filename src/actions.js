import {STORE_USER, CLEAR_USER, LOGGED_IN, STORE_FILTERS, IS_FETCHING, STORE_JOB_TASKS} from './types';

import Adapter from './adapters/Adapter';

export function isFetching() {
  return {
    type: IS_FETCHING,
   }
}

export function storeUser(json) {
  return {
    type: STORE_USER,
    payload: json
   }
}

export function clearUser() {
  return {
    type: CLEAR_USER,
   }
}

export function storeLoggedIn() {
  return {
    type: LOGGED_IN,
  }
}

export function login(email, password) {
  return (dispatch) => {
    Adapter.loginUserToken(email, password).then(json => {
      if (json) {
        Adapter.setToken(json.jwt)
        dispatch(storeLoggedIn())
        dispatch(getCurrentUser())
        console.log('login ok')
      } else {
        Adapter.deleteToken()
        dispatch(clearUser())
        console.log('login failed')
      }
    });
  }
}

export function getCurrentUser() {
  return (dispatch) => {
    Adapter.loginAuth().then(json => {
      if (json) {
        dispatch(storeUser(json))
      } else {
        dispatch(clearUser())
      }
    });
  }
}

export function storeFilters(json) {
  return {
    type: STORE_FILTERS,
    payload: json
   }
}

export function getFilters() {
  return (dispatch) => {
    dispatch(isFetching)
    Adapter.fetchFilters().then(json => {
      if (json) {
        dispatch(storeFilters(json))
        console.log('getFilters() ok')
      } else {
        console.log('getFilters() failed')
      }
    });
  }
}

export function storeJobTasks(json) {
  return {
    type: STORE_JOB_TASKS,
    payload: json
   }
}

export function getJobTasks(startDate) {
  return (dispatch) => {
    dispatch(isFetching)
    Adapter.fetchJobTasks(startDate).then(json => {
      if (json) {
        dispatch(storeJobTasks(json))
        console.log('getJobTasks() ok')
      } else {
        console.log('getJobTasks() failed')
      }
    });
  }
}

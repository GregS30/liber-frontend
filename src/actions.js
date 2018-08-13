import {STORE_USER, CLEAR_USER, LOGGED_IN, STORE_FILTERS, IS_FETCHING, STORE_TASKS, STORE_DATE_SELECT, STORE_USER_SELECT, STORE_PROJECT_SELECT, STORE_TASKNAME_SELECT, STORE_JOB_SELECT, STORE_STATUS_SELECT, STORE_FILTERED_TASKS, STORE_CLIENT_SELECT, STORE_WORKFLOW_SELECT} from './types';

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

export function storeTasks(json) {
  return {
    type: STORE_TASKS,
    payload: json
   }
}

export function storeFilteredTasks(json, metrics=null) {
  console.log("metrics=", metrics)
  return {
    type: STORE_FILTERED_TASKS,
    payload: {
      tasks: json,
      metrics: metrics,
    }
  }
}

export function getTasks(startDate) {
  return (dispatch) => {
    dispatch(isFetching)
    Adapter.fetchTasks(startDate).then(json => {
      if (json) {
        dispatch(storeTasks(json))
        dispatch(storeFilteredTasks(json))
        console.log('getTasks() ok')
      } else {
        console.log('getTasks() failed')
      }
    });
  }
}

export function storeDateSelect(selectedDate) {
  return {
    type: STORE_DATE_SELECT,
    payload: selectedDate
   }
}

export function storeTaskNameSelect(selectedTaskName) {
  return {
    type: STORE_TASKNAME_SELECT,
    payload: selectedTaskName
   }
}

export function storeUserSelect(selectedUser) {
  return {
    type: STORE_USER_SELECT,
    payload: selectedUser
   }
}

export function storeProjectSelect(selectedProject) {
  return {
    type: STORE_PROJECT_SELECT,
    payload: selectedProject
   }
}

export function storeJobSelect(selectedJob) {
  return {
    type: STORE_JOB_SELECT,
    payload: selectedJob
   }
}

export function storeStatusSelect(selectedStatus) {
  return {
    type: STORE_STATUS_SELECT,
    payload: selectedStatus
   }
}

export function storeClientSelect(selectedClient) {
 return {
   type: STORE_CLIENT_SELECT,
   payload: selectedClient
  }
}

export function storeWorkflowSelect(selectedWorkflow) {
 return {
   type: STORE_WORKFLOW_SELECT,
   payload: selectedWorkflow
  }
}

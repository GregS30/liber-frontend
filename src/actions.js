import {STORE_USER, CLEAR_USER, LOGGED_IN, STORE_FILTERS, IS_FETCHING, IS_NOT_FETCHING, STORE_TASKS, STORE_DATE_SELECT, STORE_USER_SELECT, STORE_PROJECT_SELECT, STORE_TASKNAME_SELECT, STORE_JOB_SELECT, STORE_STATUS_SELECT, STORE_FILTERED_TASKS, STORE_CLIENT_SELECT, STORE_WORKFLOW_SELECT, STORE_METRICS, CLEAR_STATE, STORE_STYLE_SELECT, STORE_PERIOD_SELECT, STORE_CHART_SELECT, STORE_CHART_DATASET, STORE_CHART_OBJECT, STORE_SCANNING, SET_WORKFLOW_FILTERS, STORE_WORKFLOWS}
from './types';

import Adapter from './adapters/Adapter';

export function isFetching() {
  return {
    type: IS_FETCHING,
   }
}

export function isNotFetching() {
  return {
    type: IS_NOT_FETCHING,
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

export function storeFilters(json) {
  return {
    type: STORE_FILTERS,
    payload: json
   }
}

export function storeTasks(json) {
  return {
    type: STORE_TASKS,
    payload: json
   }
}

export function storeFilteredTasks(json) {
  return {
    type: STORE_FILTERED_TASKS,
    payload: json
  }
}

export function storeWorkflows(json) {
  return {
    type: STORE_WORKFLOWS,
    payload: json
   }
}

export function storeMetrics(metrics, scanned) {
  // console.log("storeMetrics()", metrics)
  return {
    type: STORE_METRICS,
    payload: {
      metrics: metrics,
      scanned: scanned,
    }
  }
}

export function clearState() {
  return {
    type: CLEAR_STATE,
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

export function storeStyleSelect(selectedStyle) {
  return {
    type: STORE_STYLE_SELECT,
    payload: selectedStyle
   }
}

export function storePeriodSelect(selectedPeriod) {
  return {
    type: STORE_PERIOD_SELECT,
    payload: selectedPeriod
   }
}

export function storeChartSelect(selectedChart) {
  return {
    type: STORE_CHART_SELECT,
    payload: selectedChart
   }
}

export function storeChartDataset(dataset) {
  return {
    type: STORE_CHART_DATASET,
    payload: dataset
   }
}

export function storeChartObject(dough, bar) {
  return {
    type: STORE_CHART_OBJECT,
    payload: {dough: dough, bar: bar}
   }
}

export function storeScanned(scannedImages) {
 return {
   type: STORE_SCANNING,
   payload: scannedImages
  }
}

export function setWorkflowFilters() {
 return {
   type: SET_WORKFLOW_FILTERS,
  }
}

export function getFilters() {
  return (dispatch) => {
    dispatch(isFetching())
    Adapter.fetchFilters().then(json => {
      if (json) {
        dispatch(storeFilters(json))
        dispatch(isNotFetching())
        console.log('getFilters() ok')
      } else {
        console.log('getFilters() failed')
      }
    });
  }
}

export function getAnalytics(chartFilter, periodStart, periodEnd, projectId, taskId, userId) {
  return (dispatch) => {
    dispatch(isFetching())
    Adapter.fetchAnalytics(chartFilter, periodStart, periodEnd, projectId, taskId, userId).then(json => {
      if (json) {
        dispatch(storeChartDataset(json))
        dispatch(isNotFetching())
        console.log('getAnalytics() ok')
      } else {
        console.log('getAnalytics() failed')
      }
    });
  }
}

export function getWorkflows(onLoad, clientId, projectId, workflowId) {
  return (dispatch) => {
    dispatch(isFetching())
    Adapter.fetchWorkflows(clientId, projectId, workflowId).then(json => {
      if (json) {
        if (onLoad) {
          dispatch(setWorkflowFilters())
        }
        dispatch(storeWorkflows(json))
        dispatch(isNotFetching())
        console.log('getWorkflows() ok')
      } else {
        console.log('getWorkflows() failed')
      }
    });
  }
}

export function getTasks(startDate) {
  // This function is only used for the real-time tasks page.
  //  Which is essentially a simulator.
  //  There are only 2 possible startDate filter values: Today and Yesterday
  //  So they are hard-coded to test dates with mock data to guarantee
  //  a good volume of data at all times of the day.
  startDate = (startDate === 'Today' ? '2018-09-13' : '2017-06-15')
  return (dispatch) => {
    dispatch(isFetching())
    Adapter.fetchTasks(startDate).then(json => {
      if (json) {
        dispatch(storeTasks(json))
        dispatch(storeFilteredTasks(json))
        dispatch(isNotFetching())
        console.log('getTasks() ok')
      } else {
        console.log('getTasks() failed')
      }
    });
  }
}

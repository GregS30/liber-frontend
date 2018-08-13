import {STORE_USER, CLEAR_USER, LOGGED_IN, STORE_FILTERS, IS_FETCHING, STORE_TASKS, STORE_DATE_SELECT, STORE_USER_SELECT, STORE_PROJECT_SELECT, STORE_TASKNAME_SELECT, STORE_JOB_SELECT, STORE_STATUS_SELECT, STORE_FILTERED_TASKS} from './types';

const initialState = {
  // App
  loggedIn: false,
  username: "",
  userId: null,

  // thunkMiddleware
  isFetching: false,
  filtersLoaded: false,

  projects: [],
  clients: [],
  workflows: [],
  taskNames: [],
  taskStatus: [],
  taskDates: [],  // this is an array of date values, not objects
  jobs: [],

  tasks: [],
  filteredTasks: [],

  dateFilter: null,
  taskNameFilter: null,
  jobFilter: null,
  projectFilter: null,
  statusFilter: null,
  userFilter: null,

}

export default function reducer(state = initialState, action) {

  switch(action.type) {

    case IS_FETCHING:
      return { ...state,
        isFetching: true}

    case LOGGED_IN:
      return { ...state,
        loggedIn: true}

    case STORE_USER:
      return { ...state,
        username: action.payload.username,
        userId: action.payload.userId,
        email: action.payload.email,
        loggedIn: true,
      }

    case CLEAR_USER:
      return { ...state,
        username: "",
        userId: null,
        loggedIn: false,
      }

    case STORE_FILTERS:
      return { ...state,
        projects: action.payload.projects,
        projectFilter: action.payload.projects[0].name,
        clients: action.payload.clients,
        clientFilter: action.payload.clients[0].name,
        workflows: action.payload.workflows,
        workflowFilter: action.payload.workflows[0].name,
        taskNames: action.payload.task_names,
        taskNameFilter: action.payload.task_names[0].name,
        taskStatus: action.payload.task_states,
        statusFilter: action.payload.task_states[0].name,
        jobs: action.payload.jobs,
        jobFilter: action.payload.jobs[0].name,
        taskDates: action.payload.task_dates,
        dateFilter: action.payload.task_dates[action.payload.task_dates.length-1],
        isFetching: false,
        filtersLoaded: true,
      }

    case STORE_TASKS:
      return { ...state,
        tasks: action.payload,
        isFetching: false,
      }

    case STORE_DATE_SELECT:
      return { ...state,
        dateFilter: action.payload,
      }

    case STORE_TASKNAME_SELECT:
      return { ...state,
        taskNameFilter: action.payload,
      }

    case STORE_JOB_SELECT:
      return { ...state,
        jobFilter: action.payload,
      }

    case STORE_PROJECT_SELECT:
      return { ...state,
        projectFilter: action.payload,
      }

    case STORE_USER_SELECT:
      return { ...state,
        userFilter: action.payload,
      }

    case STORE_STATUS_SELECT:
      return { ...state,
        statusFilter: action.payload,
      }

    case STORE_FILTERED_TASKS:
      return { ...state,
        filteredTasks: action.payload,
      }

    default:
      return state;
  }
}

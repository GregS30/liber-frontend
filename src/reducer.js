import {STORE_USER, CLEAR_USER, LOGGED_IN, STORE_FILTERS, IS_FETCHING, STORE_TASKS, STORE_DATE_SELECT, STORE_USER_SELECT, STORE_PROJECT_SELECT, STORE_TASKNAME_SELECT, STORE_JOB_SELECT, STORE_STATUS_SELECT, STORE_FILTERED_TASKS, STORE_CLIENT_SELECT, STORE_WORKFLOW_SELECT, STORE_METRICS, CLEAR_STATE, STORE_STYLE_SELECT, STORE_PERIOD_SELECT, STORE_CHART_SELECT, STORE_CHART_DATASET} from './types';

const TASK_LIST_STYLES = [
  {id: 1, name: 'default'},
  {id: 2, name: 'user'},
  {id: 3, name: 'task'},
  {id: 4, name: 'status'},
]

const ANALYTIC_CHARTS = [
  {id: 1, name: 'scanner'},
  {id: 2, name: 'user'},
  {id: 3, name: 'task'},
];

const DEFAULT_LIST_STYLE = 'default';
const DEFAULT_PERIOD = "today";
const DEFAULT_CHART = 'scanner';

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
  users: [],
  periods: [],
  styles: TASK_LIST_STYLES,
  charts: ANALYTIC_CHARTS,

  tasks: [],
  filteredTasks: [],
  chartDataset: [],

  dateFilter: null,
  taskNameFilter: "",
  jobFilter: "",
  projectFilter: "",
  statusFilter: "",
  userFilter: "",
  clientFilter: "",
  workflowFilter: "",
  styleFilter: DEFAULT_LIST_STYLE,
  periodFilter: DEFAULT_PERIOD,
  chartFilter: DEFAULT_CHART,

  taskMetrics: null,

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
        projects: [{id: 0, name: ""}, ...action.payload.projects],
        clients: [{id: 0, name: ""}, ...action.payload.clients],
        workflows: [{id: 0, name: ""}, ...action.payload.workflows],
        taskNames: [{id: 0, name: ""}, ...action.payload.task_names],
        taskStatus: [{id: 0, name: ""}, ...action.payload.task_states],
        jobs: [{id: 0, name: ""}, ...action.payload.jobs],
        users: [{id: 0, name: ""}, ...action.payload.users],
        periods: action.payload.periods,
        // kludge in Today, Yesterday -- see CLEAR_STATE below also
        taskDates: ['Today', 'Yesterday'],
        dateFilter: 'Today',
        // taskDates: action.payload.task_dates,
        // dateFilter: action.payload.task_dates[action.payload.task_dates.length-1],
        isFetching: false,
        filtersLoaded: true,
      }

    case STORE_TASKS:
      return { ...state,
        tasks: action.payload,
        isFetching: false,
        taskNameFilter: "",
        jobFilter: "",
        projectFilter: "",
        statusFilter: "",
        userFilter: "",
      }

    case CLEAR_STATE:
    return { ...state,
      dateFilter: 'Today',
//      dateFilter: state.taskDates[state.taskDates.length-1],
      taskNameFilter: "",
      jobFilter: "",
      projectFilter: "",
      statusFilter: "",
      userFilter: "",
      tasks: [],
      filteredTasks: [],
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

    case STORE_CLIENT_SELECT:
      return { ...state,
        clientFilter: action.payload,
      }

    case STORE_WORKFLOW_SELECT:
      return { ...state,
        workflowFilter: action.payload,
      }

    case STORE_FILTERED_TASKS:
      return { ...state,
        filteredTasks: action.payload.tasks,
      }

    case STORE_METRICS:
      return { ...state,
        taskMetrics: action.payload.metrics,
      }

    case STORE_STYLE_SELECT:
      return { ...state,
        styleFilter: action.payload,
      }

    case STORE_PERIOD_SELECT:
      return { ...state,
        periodFilter: action.payload,
      }

    case STORE_CHART_SELECT:
      return { ...state,
        chartFilter: action.payload,
      }

    case STORE_CHART_DATASET:
      return { ...state,
        chartDataset: action.payload,
      }

    default:
      return state;
  }
}

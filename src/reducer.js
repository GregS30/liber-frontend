import {STORE_USER, CLEAR_USER, LOGGED_IN, STORE_FILTERS, IS_FETCHING} from './types';

const initialState = {
  // App
  loggedIn: false,
  username: "",
  userId: null,

  // thunkMiddleware
  isFetching: false,

  projects: [],
  clients: [],
  workflows: [],
  tasks: [],
  jobs: [],

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
        clients: action.payload.clients,
        workflows: action.payload.workflows,
        tasks: action.payload.tasks,
        jobs: action.payload.jobs,
        isFetching: false,
      }

    default:
      return state;
  }
}

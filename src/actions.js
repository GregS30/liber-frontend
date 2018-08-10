import {STORE_USER, CLEAR_USER, LOGGED_IN} from './types';
import Adapter from './adapters/Adapter';

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

export const API = 'http://localhost:3000/api/v1';
// export const API = 'https://liber-alchemy-api.herokuapp.com/api/v1';

class Adapter {

  static setToken(token) {
    localStorage.setItem("token", token)
  }

  static getToken() {
    return localStorage.getItem("token")
  }

  static deleteToken() {
    localStorage.removeItem("token")
  }

  static loginUserToken(email, password) {
    return fetch(`${API}/user_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "auth": {"email": email, "password": password}
      })
    }).then(resp => {
      if (resp.ok) {
 				return resp.json()
 			} else {
        return false
      }
    })
  }

  static loginAuth() {
    return fetch(`${API}/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
        }
      }
    ).then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        return false
      }
    })
  }

  static fetchFilters() {
    return fetch(`${API}/filters`)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        console.log("%c Adapter.fetchFilters failed", 'color: red', resp.statusText)
        return false
      }
    })
  }

  static fetchTasks(startDate) {
    return fetch(`${API}/job_tasks?start_date=${startDate}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        console.log("%c Adapter.fetchTasks failed", 'color: red', resp.statusText)
        return false
      }
    })
  }

  static fetchAnalytics(chartFilter, periodStart, periodEnd, projectId, taskId, userId) {
      let url = `${API}/analytics?chart=${chartFilter}&start=${periodStart}&finish=${periodEnd}&project=${projectId}&task=${taskId}&user=${userId}`
      console.log(url)
      return fetch(url)
      .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        console.log("%c Adapter.fetchAnalytics failed", 'color: red', resp.statusText)
        return false
      }
    })
  }

  static fetchWorkflows(clientId, projectId, workflowId) {
    return fetch(`${API}/workflows?client=${clientId}&project=${projectId}&workflow=${workflowId}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        console.log("%c Adapter.fetchWorkflows failed", 'color: red', resp.statusText)
        return false
      }
    })
  }


}
export default Adapter;

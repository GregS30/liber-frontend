const API = 'http://localhost:3000/api/v1';

class Adapter {

  static setToken(token) {
    console.log("setToken()")
    localStorage.setItem("token", token)
  }

  static getToken() {
    console.log("getToken()")
    return localStorage.getItem("token")
  }

  static deleteToken() {
    console.log("deleteToken()")
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
      console.log(resp)
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
      console.log(resp)
      if (resp.ok) {
        return resp.json()
      } else {
        return false
      }
    })
  }

  // static currentUser() {
  //   this.loginAuth(this.getToken()).then(resp => {
  //     if (resp.ok) {
  //       return resp.json()
  //     }
  //     else {
  //       return false
  //     }
  //   });
  // }

}

export default Adapter;

export function setLocalStorage(key, token) {
  return localStorage.setItem(key + '_' + sessionStorage.getItem(process.env.VUE_APP_SESSION_ID), token)
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(key + '_' + sessionStorage.getItem(process.env.VUE_APP_SESSION_ID))
}

export function getLocalStorage(key) {
  return localStorage.getItem(key + '_' + sessionStorage.getItem(process.env.VUE_APP_SESSION_ID))
}

export function removeSelfAllLocalStorage() {
  const sessionId = sessionStorage.getItem(process.env.VUE_APP_SESSION_ID)
  console.log(localStorage.length)
  if (sessionId) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      console.log(key)
      console.log(key.indexOf(sessionId))
      if (key.indexOf(sessionId) !== -1) {
        localStorage.removeItem(key)
      }
    }
    sessionStorage.removeItem(process.env.VUE_APP_SESSION_ID)
    sessionStorage.removeItem('curr_auth_route_name')
  }
}

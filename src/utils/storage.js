export function setLocalStorage(key, token) {
  return localStorage.setItem(key, token)
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(key)
}

export function getLocalStorage(key) {
  return localStorage.getItem(key)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

export function setSessionStorage(key, token) {
  return sessionStorage.setItem(key, token)
}

export function removeSessionStorage(key) {
  return sessionStorage.removeItem(key)
}

export function getSessionStorage(key) {
  return sessionStorage.getItem(key)
}

export function clearSessionStorage() {
  return sessionStorage.clear()
}

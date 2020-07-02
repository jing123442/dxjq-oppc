export function setLocalStorage(key, token) {
  return localStorage.setItem(key, token)
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(key)
}

export function getLocalStorage(key) {
  return localStorage.getItem(key)
}

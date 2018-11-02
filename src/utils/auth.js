import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setCookie(name,token) {
  return Cookies.set(name, token)
}

export function getCookie(name) {
  return Cookies.get(name)
}

export function removeCookie(name) {
  return Cookies.remove(name)
}

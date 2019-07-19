import Cookies from 'js-cookie'
import { refreshToken } from '@/api/zk'

const TokenKey = 'Admin-Token'
const RefreshToken = 'Refresh_token'
const ExpirationDate = 'timeCookie'

export function getToken() {
  return localStorage.getItem(Cookies.get(TokenKey))
}
export function getRefresh() {
  return localStorage.getItem(Cookies.get(RefreshToken))
}
export function getExpirationDate() {
  return Cookies.get(ExpirationDate)
}

export function setToken(token, time) {
  Cookies.set(TokenKey, TokenKey, { expires: new Date(new Date().getTime() + time * 1000) })
  localStorage.setItem(TokenKey, token)
  Cookies.set(ExpirationDate, new Date(new Date().getTime() + time * 1000), { expires: new Date(new Date().getTime() + time * 1000) })
}

export function setRefreshToken(refresh, expires = 7) {
  Cookies.set(RefreshToken, RefreshToken, { expires: expires })
  localStorage.setItem(RefreshToken, refresh)
}

export function setAdminToken(token) {
  Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove(TokenKey)
}
export function removeRefresh() {
  Cookies.remove(RefreshToken)
}

export function removeExpirationDate() {
  Cookies.remove(ExpirationDate)
}

export function autoGetToken(token, time) {
  time = time || new Date(getExpirationDate()).getTime() - new Date().getTime()
  if (window.cmccr_timer) {
    clearTimeout(window.cmccr_timer)
  }
  window.cmccr_timer = setTimeout(() => {
    refreshToken(token).then(res => {
      if (res.data.access_token) {
        setToken(res.data.access_token, res.data.expires_in)
        // setRefreshToken(res.data.refresh_token)
        time = res.data.expires_in * 1000
        autoGetToken(res.data.refresh_token, time)
      }
    })
  }, time)
}

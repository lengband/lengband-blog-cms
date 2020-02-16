import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const ONECLOUD_AUTH_KEY = 'token';

export function getToken() {
  return Cookies.get(ONECLOUD_AUTH_KEY);
}

export function setToken(token) {
  return Cookies.set(ONECLOUD_AUTH_KEY, token);
}

export function removeToken() {
  return Cookies.remove(ONECLOUD_AUTH_KEY);
}

export function decodeToken(token = getToken()) {
  if (token) {
    const auth = jwt.decode(token);
    if (auth) {
      return auth;
    }
  }
  return null;
}

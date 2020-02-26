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

export function verifyToken(token = getToken()) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'lengband', function(err, decoded) {
      try {
        const ret = {
          validate: false,
          token: {},
          error: {},
        };
        if (err) {
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
          ret.validate = false;
          ret.token = null;
          ret.error = err;
        } else {
          ret.validate = true;
          ret.token = decoded;
          ret.error = null;
        }
        resolve(ret);
      } catch (error) {
        reject(error);
      }
    });
  });
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

import { useReducer } from 'react';
import axios from 'axios';
import { Message } from '@alifd/next';
import _ from 'lodash';
import { baseURL } from './api';
import { getToken } from './auth';
import { ROUTER_BASE_PATH } from '@/constants';

// 新创建一个axios实例，并进行基础配置
const http = axios.create({
  baseURL,
  timeout: 2000,
  // withCredentials: true,
});
// http.defaults.withCredentials = true;

http.interceptors.request.use(c => {
  const config = c;
  if (config.url.includes('login')) {
    config.headers['X-auth-view'] = 'admin';
    return config;
  }
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Method to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 */
export async function request(options) {
  try {
    const response = await http(options);
    const { data, error } = handleResponse(response);
    if (error) {
      throw error;
    } else {
      return { response, data };
    }
  } catch (error) {
    const resData = error.response.data;
    const errorStr = _.isString(resData.message) ? resData.message : error;
    Message.error(`请求失败：${errorStr}`);
    if (!options.url.includes('login') && error.response.status === 401) {
      location.href = `${ROUTER_BASE_PATH}/user/login`;
    }
    throw error;
  }
}

/**
 * Hooks to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 * @return {object}
 *   @param {object} response - response of axios (https://github.com/axios/axios#response-schema)
 *   @param {object} error - HTTP or use defined error
 *   @param {boolean} loading - loading status of the request
 *   @param {function} request - function to make the request manually
 */
export function useRequest(options) {
  const initialState = {
    response: null,
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);

  /**
   * Method to make request manually
   * @param {object} config - axios config to shallow merged with options before making request
   */
  async function request(config) {
    try {
      dispatch({ type: 'init' });
      const response = await http({
        ...options,
        ...config,
      });
      const { data, error } = handleResponse(response);
      if (error) {
        throw error;
      } else {
        dispatch({ type: 'success', response });
        return { response, data };
      }
    } catch (error) {
      dispatch({ type: 'error', error });
      throw error;
    }
  }
  return {
    ...state,
    request,
  };
}

/**
 * Reducer to handle the status of the request
 * @param {object} state - original status
 * @param {object} action - action of dispatch
 * @return {object} new status
 */
function requestReducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        response: null,
        error: null,
        loading: true,
      };
    case 'success':
      return {
        response: action.response,
        error: null,
        loading: false,
      };
    case 'error':
      return {
        response: null,
        error: action.error,
        loading: false,
      };
    default:
      return {
        response: null,
        error: null,
        loading: false,
      };
  }
}

/**
 * Custom response data handler logic
 *
 * @param {object} response - response data returned by request
 * @return {object} data or error according to status code
 */
function handleResponse(response) {
  const { data, status } = response;
  // Please modify the status key according to your business logic
  // normally the key is `status` or `code`
  if (status === 200 || status === 204) {
    return { data };
  } else {
    const error = new Error(data.message || '后端接口异常');
    return { error };
  }
}

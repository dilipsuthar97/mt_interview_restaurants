import AsyncStorage from '@react-native-async-storage/async-storage';
import {storageKeys} from '_commonConfig';
import {Navigation, Popup} from '_helpers';
import apiConfig from './apiConfig';
import * as ERROR from './Errors';

const POST = 'post';
const GET = 'get';
const PUT = 'put';
const PATCH = 'patch';
const DELETE = 'delete';

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(storageKeys.token);
    if (token !== null) {
      return token;
    }
  } catch (e) {
    throw new Error('Token not found or could not be retrieved');
  }
};

const handleResponse = response => {
  console.log('API responde -> ', response);
  return response.json();
  // const contentType = response.headers.get('Content-Type');
  // if (contentType && contentType.indexOf('application/json') !== -1) {
  //   return response.json();
  // } else {
  //   return response.text();
  // }
};

const request = async (route, requestOptions) => {
  const {
    baseURL = apiConfig.BASE_URL,
    method = GET,
    payload = null,
    formData = null,
    headers = {},
    json = true,
    priv = false,
  } = requestOptions;

  let options = {
    method: method,
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  };

  if (payload) {
    Object.assign(options, {
      headers: {...options.headers, 'Content-Type': 'application/json'},
    });
  }
  if (formData) {
    Object.assign(options, {
      headers: {...options.headers, 'Content-Type': 'multipart/form-data'},
    });
  }
  if (priv) {
    let token = await getToken();
    Object.assign(options, {
      headers: {...options.headers, Authorization: `Bearer ${token}`},
    });
  }

  return fetch(`${baseURL}${route}`, options).then(res =>
    json ? handleResponse(res) : res,
  );
};

const handleError = (error, msg = ERROR.DEFAULT_ERROR) => {
  let errMsg = msg;

  if (typeof msg === 'string') {
    Popup.error(errMsg);
    return {
      status: error.status || 500,
      message: errMsg,
    };
  }

  switch (error.status) {
    case 401:
      errMsg = msg?.REQUEST_ERROR;
      break;
    case 403:
      errMsg = msg?.UNAUTHORISED;
      break;
    case 404:
      errMsg = msg?.NOT_FOUND;
      break;
    case 501:
      errMsg = msg?.SERVER_ERROR;
      break;
    case 502:
      errMsg = msg?.DATABASE_ERROR;
      break;
    default:
      errMsg = DEFAULT_ERROR;
  }

  Alert.alert('Alert', errMsg);
  return {
    status: error.status,
    message: errMsg,
  };
};

export default {
  POST,
  PUT,
  PATCH,
  GET,
  DELETE,
  ERROR,
  request,
  handleResponse,
  handleError,
  getToken,
};

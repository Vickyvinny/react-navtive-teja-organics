import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseURL} from '../config/locals/config';
import {store} from '../redux/store';

type IResponseType = 'json' | 'text' | 'blob';
type IResolve = {
  response: any;
  error: string | unknown | null;
};
type IMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const resolve = async (promise: () => void) => {
  const resolved: IResolve = {
    response: null,
    error: null,
  };
  try {
    const response = await promise();
    resolved.response = response;
  } catch (e) {
    resolved.error = 'Something went wrong...';
  }

  return resolved;
};

const networkCall = async (
  url: string,
  method: IMethod = 'GET',
  body?: RequestInit['body'],
  headers?: RequestInit['headers'],
  responseType: IResponseType = 'json',
) => {
  const makeCall = async () => {
    try {
      const fullUrl = /(http(s?)):\/\//i.test(url) ? url : baseURL + '/' + url;
      console.log('fullURL ==', fullUrl);
      const AuthData = store.getState()?.Auth;
      const token = await AsyncStorage.getItem('token');

      console.log(token, '=====>network');
      const defaultHeaders = {
        'Content-Type':
          body instanceof FormData ? 'multipart/form-data' : 'application/json',
        ...(token && {Authorization: token}),
        ...headers,
      };

      const response = await fetch(fullUrl, {
        method,
        headers: defaultHeaders,
        ...(body && {body}),
      });

      return response[responseType]();
    } catch (error) {
      return error;
    }
  };

  return await resolve(makeCall);
};

export default networkCall;

import {API_URL, TOKEN_ID} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {ErrorData} from './data';
import {useWrapDispatch} from 'hooks';
import {SET_LOADING} from 'store/reducers/app';
import {EVENT, EventUtil} from 'utils';

const BASE_CONFIG = {
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'content-type': 'application/json',
    'Cache-Control': 'no-cache, must-revalidate',
  },
};

const api = axios.create(BASE_CONFIG);

function genUrl(url: string): string {
  return `${API_URL}${url}`;
}

function genConfig(options: AxiosRequestConfig = {}): AxiosRequestConfig {
  return {...BASE_CONFIG, ...options};
}

async function genAuthConfig() {
  const token = await AsyncStorage.getItem(TOKEN_ID);
  const Authorization = token === null ? '' : `Bearer ${token}`;
  return {headers: {...BASE_CONFIG.headers, Authorization}};
}

async function errorHandler(err: any): Promise<ErrorData> {
  console.warn(err.code);
  let result: ErrorData = {
    error: true,
    data: null,
    message: null,
  };

  if (axios.isAxiosError(err)) {
    const response = err.response as AxiosResponse<ErrorData>;

    switch (response.status) {
      case 500:
        result = {
          data: null,
          message: response.data.message ? response.data.message : '',
          error: true,
        };
        break;
      case 400:
        result = {
          data: null,
          message: response.data.message ? response.data.message : '',
          error: true,
        };
        break;

      case 401:
      case 403:
        EventUtil.emit(EVENT.forceLogout, 'forceLogout');
        break;
      default:
        result = {
          data: null,
          message: response.data.message,
          error: true,
        };
        break;
    }
  }

  return result;
}

export default {
  genAuthConfig,
  genUrl,
  async get<D>(
    url: string,
    loading: boolean = false,
    body = {},
    options = {},
  ): Promise<ErrorData | D> {
    if (loading) {
      EventUtil.emit(EVENT.showLoading, url);
    }

    try {
      let _options = {...options, params: body};
      const {data} = await api.get<D>(genUrl(url), genConfig(_options));

      return data;
    } catch (err) {
      return await errorHandler(err);
    } finally {
      if (loading) {
        EventUtil.emit(EVENT.hideLoading, url);
      }
    }
  },

  async post<D>(
    url: string,
    loading: boolean = false,
    body = {},
    options = {},
  ): Promise<ErrorData | D> {
    if (loading) {
      EventUtil.emit(EVENT.showLoading, url);
    }

    try {
      const data = await api.post<D>(genUrl(url), body, genConfig(options));

      return data.data;
    } catch (err) {
      return await errorHandler(err);
    } finally {
      if (loading) {
        EventUtil.emit(EVENT.hideLoading, url);
      }
    }
  },

  async postAsFormData<D>(
    url: string,
    loading: boolean = false,
    body = new FormData(),
    options = {},
  ): Promise<ErrorData | D> {
    if (loading) {
      EventUtil.emit(EVENT.showLoading, url);
    }

    try {
      const _options = {
        ...options,
        headers: {'Content-Type': 'multipart/form-data'},
      };
      const data = await api.post<D>(genUrl(url), body, genConfig(_options));

      return data.data;
    } catch (err) {
      return await errorHandler(err);
    } finally {
      if (loading) {
        EventUtil.emit(EVENT.hideLoading, url);
      }
    }
  },

  async patch<D>(
    url: string,
    loading: boolean = false,
    body = {},
    options = {},
  ): Promise<ErrorData | D> {
    if (loading) {
      EventUtil.emit(EVENT.showLoading, url);
    }

    try {
      const {data} = await api.patch<D>(genUrl(url), body, genConfig(options));

      return data;
    } catch (err) {
      return await errorHandler(err);
    } finally {
      if (loading) {
        EventUtil.emit(EVENT.hideLoading, url);
      }
    }
  },

  async put<D>(
    url: string,
    loading: boolean = false,
    body = {},
    options = {},
  ): Promise<ErrorData | D> {
    if (loading) {
      EventUtil.emit(EVENT.showLoading, url);
    }

    try {
      const {data} = await api.put<D>(genUrl(url), body, genConfig(options));
      return data;
    } catch (err) {
      return await errorHandler(err);
    } finally {
      if (loading) {
        EventUtil.emit(EVENT.hideLoading, url);
      }
    }
  },

  async delete<D>(
    url: string,
    loading: boolean = false,
    options = {},
  ): Promise<ErrorData | D> {
    if (loading) {
      EventUtil.emit(EVENT.showLoading, url);
    }

    try {
      const {data} = await api.delete<D>(genUrl(url), genConfig(options));
      return data;
    } catch (err) {
      return await errorHandler(err);
    } finally {
      if (loading) {
        EventUtil.emit(EVENT.hideLoading, url);
      }
    }
  },
};

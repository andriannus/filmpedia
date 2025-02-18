import axios from 'axios';
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const apiTMDBService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_SERVICE_URL,
});

function interceptConfigRequest(
  config: InternalAxiosRequestConfig<unknown>,
): InternalAxiosRequestConfig<unknown> {
  const token = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

function interceptErrorRequest(error: AxiosError): Promise<never> {
  return Promise.reject(error);
}

function interceptSuccessResponse(response: AxiosResponse): AxiosResponse {
  return response;
}

function interceptErrorResponse(error: AxiosError): Promise<never> {
  if (!error.response?.data) {
    return Promise.reject(error.message);
  }

  return Promise.reject(error.response.data);
}

apiTMDBService.interceptors.request.use(
  interceptConfigRequest,
  interceptErrorRequest,
);

apiTMDBService.interceptors.response.use(
  interceptSuccessResponse,
  interceptErrorResponse,
);

export { apiTMDBService };

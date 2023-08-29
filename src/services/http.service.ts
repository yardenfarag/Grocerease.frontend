import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://grocerease-api.onrender.com/api/'
  : '//localhost:5555/api/';

const axios = Axios.create({
  withCredentials: true
});

export const httpService = {
  async get(endpoint: string, data?: any): Promise<any> {
    return ajax(endpoint, 'GET', data);
  },
  async post(endpoint: string, data?: any): Promise<any> {
    return ajax(endpoint, 'POST', data);
  },
  async put(endpoint: string, data?: any): Promise<any> {
    return ajax(endpoint, 'PUT', data);
  },
  async delete(endpoint: string, data?: any): Promise<any> {
    return ajax(endpoint, 'DELETE', data);
  }
};

async function ajax(endpoint: string, method: string = 'GET', data: any = null): Promise<any> {
  try {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: (method === 'GET') ? data : null
    };
    const res: AxiosResponse = await axios(config);
    return res.data;
  } catch (err:any) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data);
    console.dir(err);
    if (err.response && err.response.status === 401) {
      sessionStorage.clear();
      window.location.assign('/');
      // Depends on routing startegy - hash or history
      // window.location.assign('/#/login')
      // window.location.assign('/login')
      // router.push('/login')
    }
    throw err;
  }
}

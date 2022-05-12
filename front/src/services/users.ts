import api from '.';
import APIError from '../errors/APIError';
import ConnectError from '../errors/ConnectError';

export interface User {
  id: number
  pseudo: string
  discriminator: string
  email: string
  avatar: string
}

interface UserUpdate {
  pseudo?: string
  password?: string
  email?: string
  avatar?: string
}

interface UserCreate {
  pseudo: string
  password: string
  email: string
}

export default class UserAPIService {
  static async createOne(body: UserCreate): Promise<User> {
    const { data, status } = await api.post('/users', body).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async deleteOne(userId = localStorage.getItem('userId')): Promise<void> {
    const { data, status } = await api.delete(`/users/${userId}`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 500) throw new ConnectError('Server not responding');
  }

  static disconnect(): void {
    localStorage.clear();
    delete api.defaults.headers.common.Authorization;
  }

  static async getOne(userId = localStorage.getItem('userId')): Promise<User> {
    const { data, status } = await api.get(`/users/${userId}`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'user not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async register(body?: unknown): Promise<void> {
    const token = localStorage.getItem('token');

    if (!token) {
      const { data, status } = await api.post('/users/token', body).catch(({ response }) => response);

      if (status === 400) throw new APIError(data);
      if (status === 500) throw new ConnectError('Server not responding');

      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.id);
    } else api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  static async updateOne(body: UserUpdate, userId = localStorage.getItem('userId')): Promise<User> {
    const { data, status } = await api.patch(`/users/${userId}`, body).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'user not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }
}

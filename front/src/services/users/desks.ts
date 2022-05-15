import api from '..';

import APIError from '../../errors/APIError';
import ConnectError from '../../errors/ConnectError';

export interface Desk {
  id: number;
  background: string | null;
  theme: string | 'default';
  color: string | null;
  accountId: number;
}

interface DeskUpdate {
  background?: FileList;
  theme?: 'default';
  color?: string;
}

interface DeskCreate {
  theme: 'default';
  color?: string;
}

export default class DeskAPIService {
  static async createOne(body: DeskCreate, userId = localStorage.getItem('userId')): Promise<Desk> {
    const { data, status } = await api.post(`/users/${userId}/desks`, body).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async deleteOne(deskId: number, userId = localStorage.getItem('userId')): Promise<void> {
    const { data, status } = await api.delete(`/users/${userId}/desks/${deskId}`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 500) throw new ConnectError('Server not responding');
  }

  static async getOne(deskId: number, userId = localStorage.getItem('userId')): Promise<Desk> {
    const { data, status } = await api.get(`/users/${userId}/desks/${deskId}`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'Desk or User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async updateOne(body: DeskUpdate, deskId: number, userId = localStorage.getItem('userId')): Promise<Desk> {
    const { data, status } = await api.patch(`/users/${userId}/desks/${deskId}`, body).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'Desk or User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }
}

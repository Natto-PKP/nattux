import api from '..';

import APIError from '../../errors/APIError';
import ConnectError from '../../errors/ConnectError';

export interface File {
  id: number;
  name: string;
  type: string | 'text' | null;
  content: string | null;
  favorite: boolean;
  accountId: number;
  folderId: number | null;
}

interface FileUpdate {
  name?: string;
  type?: 'text' | 'markdown';
  content?: string;
  favorite?: boolean;
  folderId?: number;
}

interface FileCreate {
  name: string;
  type?: 'text' | 'markdown';
  content?: string;
  folderId?: number;
}

export default class FileAPIService {
  static async createOne(body: FileCreate, userId = localStorage.getItem('userId')): Promise<File> {
    const { data, status } = await api.post(`/users/${userId}/files`, body).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async deleteOne(fileId: number, userId = localStorage.getItem('userId')): Promise<void> {
    const { data, status } = await api.delete(`/users/${userId}/files/${fileId}`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 500) throw new ConnectError('Server not responding');
  }

  static async getAll(userId = localStorage.getItem('userId')): Promise<File[]> {
    const { data, status } = await api.get(`/users/${userId}/files`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async getOne(fileId: number, userId = localStorage.getItem('userId')): Promise<File> {
    const { data, status } = await api.get(`/users/${userId}/files/${fileId}`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'File not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async updateOne(body: FileUpdate, fileId: number, userId = localStorage.getItem('userId')): Promise<File> {
    const { data, status } = await api.patch(`/users/${userId}/files/${fileId}`, body).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'File not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }
}

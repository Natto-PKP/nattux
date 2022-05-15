import api from '..';

import APIError from '../../errors/APIError';
import ConnectError from '../../errors/ConnectError';

import type { File } from './files';

export interface Folder {
  id: number;
  name: string;
  icon: string | 'default';
  favorite: boolean;
  accountId: number;
  folderId: number | null;
}

interface FolderUpdate {
  name?: string;
  icon?: FileList;
  folderId?: number;
  favorite?: boolean;
}

interface FolderCreate {
  name: string;
  icon?: FileList;
  folderId?: number;
}

interface FileCreateInFolder {
  name: string;
  type?: string;
  content?: string;
}

export default class FolderAPIService {
  static async createOne(body: FolderCreate, userId = localStorage.getItem('userId')): Promise<Folder> {
    const { data, status } = await api.post(`/users/${userId}/folders`, body).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async createOneFileInFolder(body: FileCreateInFolder, folderId: number, userId = localStorage.getItem('userId')): Promise<File> {
    const { data, status } = await api.post(`/users/${userId}/folders/${folderId}/files`, body).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'Folder or User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async deleteOne(folderId: number, userId = localStorage.getItem('userId')): Promise<void> {
    const { data, status } = await api.delete(`/users/${userId}/folders/${folderId}`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 500) throw new ConnectError('Server not responding');
  }

  static async getAll(userId = localStorage.getItem('userId')): Promise<Folder[]> {
    const { data, status } = await api.get(`/users/${userId}/folders`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'Folder or User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async getOne(folderId: number, userId = localStorage.getItem('userId')): Promise<Folder> {
    const { data, status } = await api.get(`/users/${userId}/folders/${folderId}`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'Folder or User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async getOneFiles(folderId: number, userId = localStorage.getItem('userId')): Promise<File[]> {
    const { data, status } = await api.get(`/users/${userId}/folders/${folderId}/files`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'Folder or User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async updateOne(body: FolderUpdate, folderId: number, userId = localStorage.getItem('userId')): Promise<File> {
    const { data, status } = await api.patch(`/users/${userId}/folders/${folderId}`, body).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'Folder or User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }
}

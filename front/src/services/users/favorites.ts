import api from '..';

import APIError from '../../errors/APIError';
import ConnectError from '../../errors/ConnectError';

export interface FavoriteFile {
  id: number;
  name: string;
  type: 'text' | 'markdown';
  content: string | null;
  favorite: true;
  accountId: number;
  folderId: number | null;
}

export interface FavoriteFolder {
  id: number;
  name: string;
  icon: string | 'default';
  favorite: true;
  accountId: number;
  folderId: number | null;
}

export default class FavoriteAPIService {
  static async getAllFavoriteFiles(userId = localStorage.getItem('userId')): Promise<FavoriteFile[]> {
    const { data, status } = await api.get(`/users/${userId}/favorites/files`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async getAllFavoriteFolders(userId = localStorage.getItem('userId')): Promise<FavoriteFolder[]> {
    const { data, status } = await api.get(`/users/${userId}/favorites/folders`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async getOneFavoriteFile(fileId: number, userId = localStorage.getItem('userId')): Promise<FavoriteFile> {
    const { data, status } = await api.get(`/users/${userId}/favorites/files/${fileId}`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }

  static async getOneFavoriteFolder(folderId: number, userId = localStorage.getItem('userId')): Promise<FavoriteFolder> {
    const { data, status } = await api.get(`/users/${userId}/favorites/folders/${folderId}`).catch(({ response }) => response);

    if (status === 400) throw new APIError(data);
    if (status === 401) throw new ConnectError('Please reconnect');
    if (status === 404) throw new APIError({ code: 404, message: 'User not found' });
    if (status === 500) throw new ConnectError('Server not responding');

    return data;
  }
}

import database from '../../database';

import type { File, Folder } from '../../../typings';

export default {
  getAllFiles: async (userId: number): Promise<File[]> => {
    const result = await database.query('SELECT * FROM "file_view" WHERE "userId" = $1 AND "favorite" = true', [userId]);
    return result.rows;
  },

  getAllFolders: async (userId: number): Promise<Folder[]> => {
    const result = await database.query('SELECT * FROM "folder_view" WHERE "userId" = $1 AND "favorite" = true', [userId]);
    return result.rows;
  },

  getOneFile: async (fileId: number, userId: number): Promise<File> => {
    const result = await database.query('SELECT * FROM "file_view" WHERE "id" = $1 AND "userId" = $2 AND "favorite" = true', [fileId, userId]);
    return result.rows[0];
  },

  getOneFolder: async (folderId: number, userId: number): Promise<Folder> => {
    const result = await database.query('SELECT * FROM "folder_view" WHERE "id" = $1 AND "userId" = $2 AND "favorite" = true', [folderId, userId]);
    return result.rows[0];
  },
};

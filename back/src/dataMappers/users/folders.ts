import database from '../../database';

import type { File, Folder } from '../../../typings';

export default {
  createOne: async (data: unknown, userId: number): Promise<Folder> => {
    const result = await database.query('SELECT * FROM create_folder($1, $2)', [data, userId]);
    return result.rows[0];
  },

  createFileInFolder: async (data: any, folderId: number, userId: number): Promise<File> => {
    const result = await database.query('SELECT * FROM create_file($1, $2)', [{ ...data, folderId }, userId]);
    return result.rows[0];
  },

  deleteOne: async (folderId: number, userId: number): Promise<void> => {
    await database.query('DELETE FROM "folder" WHERE "id" = $1 AND "account_id" = $2', [folderId, userId]);
  },

  getAll: async (userId: number): Promise<Folder[]> => {
    const result = await database.query('SELECT * FROM "folder_view" WHERE "userId" = $1', [userId]);
    return result.rows;
  },

  getFilesByFolder: async (folderId: number, userId: number): Promise<File[]> => {
    const result = await database.query('SELECT * FROM "file_view" WHERE "folderId" = $1 AND "userId" = $2', [folderId, userId]);
    return result.rows;
  },

  getOne: async (folderId: number, userId: number): Promise<Folder> => {
    const result = await database.query('SELECT * FROM "folder_view" WHERE "id" = $1 AND "userId" = $2', [folderId, userId]);
    return result.rows[0];
  },

  updateOne: async (data: unknown, folderId: number, userId: number): Promise<Folder> => {
    const result = await database.query('SELECT * FROM update_folder($1, $2, $3)', [data, folderId, userId]);
    return result.rows[0];
  },
};

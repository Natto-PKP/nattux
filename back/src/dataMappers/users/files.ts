import database from '../../database';

import type { File } from '../../../typings';

export default {
  createOne: async (data: unknown, userId: number): Promise<File> => {
    const result = await database.query('SELECT * FROM create_file($1, $2)', [data, userId]);
    return result.rows[0];
  },

  deleteOne: async (fileId: number, userId: number): Promise<void> => {
    await database.query('DELETE FROM "file" WHERE "id" = $1 AND "account_id" = $2', [fileId, userId]);
  },

  getAll: async (userId: number): Promise<File[]> => {
    const result = await database.query('SELECT * FROM "file_view" WHERE "userId" = $1', [userId]);
    return result.rows;
  },

  getOne: async (fileId: number, userId: number): Promise<File> => {
    const result = await database.query('SELECT * FROM "file_view" WHERE "id" = $1 AND "userId" = $2', [fileId, userId]);
    return result.rows[0];
  },

  updateOne: async (data: unknown, fileId: number, userId: number): Promise<File> => {
    const result = await database.query('SELECT * FROM update_file($1, $2, $3)', [data, fileId, userId]);
    return result.rows[0];
  },
};

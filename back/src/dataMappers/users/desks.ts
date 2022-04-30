import database from '../../database';

import type { Desk } from '../../../typings';

export default {
  createOne: async (data: unknown, userId: number): Promise<Desk> => {
    const result = await database.query('SELECT * FROM create_desk($1, $2)', [data, userId]);
    return result.rows[0];
  },

  deleteOne: async (deskId: number): Promise<void> => {
    await database.query('DELETE FROM "desk" WHERE "id" = $1', [deskId]);
  },

  getOne: async (deskId: number): Promise<Desk> => {
    const result = await database.query('SELECT * FROM "desk_view" WHERE "id" = $1', [deskId]);
    return result.rows[0];
  },

  getOneByUserId: async (userId: number): Promise<Desk> => {
    const result = await database.query('SELECT * FROM "desk_view" WHERE "userId" = $1', [userId]);
    return result.rows[0];
  },

  updateOne: async (data: unknown, deskId: number, userId: number): Promise<Desk> => {
    const result = await database.query('SELECT * FROM update_desk($1, $2, $3)', [data, deskId, userId]);
    return result.rows[0];
  },
};

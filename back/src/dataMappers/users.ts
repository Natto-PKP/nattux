import { compare } from 'bcrypt';

import database from '../database';
import DBError from '../errors/DBError';

import type { Account } from '../../typings';

export default {
  createOne: async (data: unknown): Promise<Account> => {
    const result = await database.query('SELECT * FROM create_account($1)', [data]);
    return result.rows[0];
  },

  connect: async (email: string, password: string): Promise<Account> => {
    const { rows: [result] } = await database.query('SELECT * FROM "account" WHERE "email" = $1', [email]);
    if (!result) throw new DBError('email or password invalid');
    if (!(await compare(password, result.password))) throw new DBError('email or password invalid');
    return result;
  },

  deleteOne: async (userId: number): Promise<void> => {
    await database.query('DELETE FROM "account" WHERE "id" = $1', [userId]);
  },

  getOne: async (userId: number): Promise<Account> => {
    const result = await database.query('SELECT * FROM "account" WHERE "id" = $1', [userId]);
    return result.rows[0];
  },

  getOneByEmail: async (email: string) => {
    const result = await database.query('SELECT * FROM "account" WHERE "email" = $1', [email]);
    return result.rows[0];
  },

  getOneByTag: async (pseudo: string, discriminator: string) => {
    const result = await database.query('SELECT * FROM "account" WHERE "pseudo" = $1 AND "discriminator" = $2', [pseudo, discriminator]);
    return result.rows[0];
  },

  updateOne: async (data: unknown, userId: number): Promise<Account> => {
    const result = await database.query('SELECT * FROM update_account($1, $2)', [data, userId]);
    return result.rows[0];
  },
};

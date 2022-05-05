/* eslint-disable no-restricted-syntax */
import jwt from 'jsonwebtoken';
import { existsSync, unlinkSync, writeFileSync } from 'fs';
import bcrypt from 'bcrypt';

import type { Request, Response } from 'express';

import path from 'path';
import dataMappers from '../dataMappers/users';
import APIError from '../errors/APIError';

function generateDiscriminator(): string {
  const results = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
  return results.join('');
}

export default {
  createOne: async (req: Request, res: Response) => {
    if (await dataMappers.getOneByEmail(req.body.email)) throw new APIError('email already taken', 400);

    for await (const discriminator of Array.from({ length: 10 }, () => generateDiscriminator())) {
      const exists = await dataMappers.getOneByTag(req.body.pseudo, discriminator);

      if (!exists) {
        req.body.discriminator = discriminator;
        break;
      }
    }

    if (!req.body.discriminator) throw new APIError('username is already taken', 400);
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const result = await dataMappers.createOne(req.body);
    result.password = null;

    res.status(201).json(result);
  },

  connect: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { id } = await dataMappers.connect(email, password);

    const token = jwt.sign({ ms: Date.now(), id }, <string>process.env.JWT_SECRET, { expiresIn: '10h' });
    res.status(201).json({ id, token });
  },

  deleteOne: async (req: Request, res: Response) => {
    await dataMappers.deleteOne(Number(req.params.userId));
    res.status(204).json(null);
  },

  getOne: async (req: Request, res: Response) => {
    const result = await dataMappers.getOne(Number(req.params.userId));
    result.password = null;

    res.status(200).json(result);
  },

  updateOne: async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (req.body.avatar === 'deleted') {
      const user = await dataMappers.getOne(Number(userId));
      if (user.avatar) {
        const to = path.join(process.cwd(), 'static/avatars', user.avatar);
        if (existsSync(to)) unlinkSync(to);
      }
    } else if (req.file) {
      if (!/image\/(png|jpg|jpeg)/.test(req.file.mimetype)) throw new APIError('avatar must be png, jpg or jpeg image', 400);
      const name = await bcrypt.hash(`${userId}-${Date.now()}`, 3);
      const ext = req.file.mimetype.split('/')[1];
      req.body.avatar = `${name}.${ext}`;
      writeFileSync(path.join(process.cwd(), `static/avatars/${req.body.avatar}`), req.file.buffer);
    }

    const result = await dataMappers.updateOne(req.body, Number(userId));
    result.password = null;

    res.status(200).json(result);
  },
};

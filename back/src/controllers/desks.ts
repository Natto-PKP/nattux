import { existsSync, unlinkSync, writeFileSync } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

import type { Request, Response } from 'express';

import dataMappers from '../dataMappers/desks';
import APIError from '../errors/APIError';

export default {
  createOne: async (req: Request, res: Response) => {
    const result = await dataMappers.createOne(req.body, Number(req.params.userId));
    res.status(201).json(result);
  },

  deleteOne: async (req: Request, res: Response) => {
    await dataMappers.deleteOne(Number(req.params.deskId));
    res.status(204).json(null);
  },

  getOne: async (req: Request, res: Response) => {
    const result = await dataMappers.getOne(Number(req.params.deskId));
    res.status(200).json(result);
  },

  updateOne: async (req: Request, res: Response) => {
    const { deskId } = req.params;

    if (req.body.background === 'deleted') {
      const desk = await dataMappers.getOne(Number(deskId));
      if (desk.background) {
        const to = path.join(process.cwd(), 'static/desks/backgrounds', desk.background);
        if (existsSync(to)) unlinkSync(to);
      }
    } else if (req.file) {
      if (!/image\/(png|jpg|jpeg)/.test(req.file.mimetype)) throw new APIError('background must be png, jpg or jpeg image', 400);
      const name = await bcrypt.hash(`${deskId}-${Date.now()}`, 3);
      const ext = req.file.mimetype.split('/')[1];
      req.body.background = `${name}.${ext}`;
      writeFileSync(path.join(process.cwd(), `static/desks/backgrounds/${req.body.background}`), req.file.buffer);
    }

    const result = await dataMappers.updateOne(req.body, Number(deskId));
    res.status(200).json(result);
  },
};

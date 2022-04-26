import jwt from 'jsonwebtoken';

import type { Request, Response } from 'express';

import dataMappers from '../dataMappers/users';

export default {
  createOne: async (req: Request, res: Response) => {
    const result = await dataMappers.createOne(req.body);
    res.status(201).json(result);
  },

  connect: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await dataMappers.connect(email, password);

    const token = jwt.sign(email, <string>process.env.JWT_SECRET, { expiresIn: '10h' });
    res.status(201).json({ id: result.id, token });
  },

  deleteOne: async (req: Request, res: Response) => {
    await dataMappers.deleteOne(Number(req.params.accountId));
    res.status(204).json(null);
  },

  getOne: async (req: Request, res: Response) => {
    const result = await dataMappers.getOne(Number(req.params.accountId));
    res.status(200).json(result);
  },

  updateOne: async (req: Request, res: Response) => {
    const result = await dataMappers.updateOne(req.body, Number(req.params.accountId));
    res.status(200).json(result);
  },
};

import type { Request, Response } from 'express';

import dataMappers from '../../dataMappers/users/files';

export default {
  createOne: async (req: Request, res: Response) => {
    const result = await dataMappers.createOne(req.body, Number(req.params.userId));
    res.status(201).json(result);
  },

  deleteOne: async (req: Request, res: Response) => {
    await dataMappers.deleteOne(Number(req.params.fileId), Number(req.params.userId));
    res.status(204).json(null);
  },

  getAll: async (req: Request, res: Response) => {
    const results = await dataMappers.getAll(Number(req.params.userId));
    res.status(200).json(results);
  },

  getOne: async (req: Request, res: Response) => {
    const result = await dataMappers.getOne(Number(req.params.fileId), Number(req.params.userId));
    res.status(200).json(result);
  },

  updateOne: async (req: Request, res: Response) => {
    const result = await dataMappers.updateOne(
      req.body,
      Number(req.params.fileId),
      Number(req.params.userId),
    );

    res.status(200).json(result);
  },
};

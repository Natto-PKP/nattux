import type { Request, Response } from 'express';

import dataMappers from '../../dataMappers/users/folders';

export default {
  createOne: async (req: Request, res: Response) => {
    const result = await dataMappers.createOne(req.body, Number(req.params.userId));
    res.status(201).json(result);
  },

  createFileInFolder: async (req: Request, res: Response) => {
    const result = await dataMappers.createFileInFolder(
      req.body,
      Number(req.params.folderId),
      Number(req.params.userId),
    );

    res.status(201).json(result);
  },

  deleteOne: async (req: Request, res: Response) => {
    await dataMappers.deleteOne(Number(req.params.folderId), Number(req.params.userId));
    res.status(204).json(null);
  },

  getAll: async (req: Request, res: Response) => {
    const results = await dataMappers.getAll(Number(req.params.userId));
    res.status(200).json(results);
  },

  getFilesByFolder: async (req: Request, res: Response) => {
    const results = await dataMappers.getFilesByFolder(
      Number(req.params.folderId),
      Number(req.params.userId),
    );

    res.status(200).json(results);
  },

  getOne: async (req: Request, res: Response) => {
    const result = await dataMappers.getOne(Number(req.params.folderId), Number(req.params.userId));
    res.status(200).json(result);
  },

  updateOne: async (req: Request, res: Response) => {
    const result = await dataMappers.updateOne(
      req.body,
      Number(req.params.folderId),
      Number(req.params.userId),
    );

    res.status(200).json(result);
  },
};

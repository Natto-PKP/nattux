import type { Request, Response } from 'express';

import dataMappers from '../../dataMappers/users/favorites';

export default {
  getAllFiles: async (req: Request, res: Response) => {
    const result = await dataMappers.getAllFiles(Number(req.params.userId));
    res.status(200).json(result);
  },

  getAllFolders: async (req: Request, res: Response) => {
    const result = await dataMappers.getAllFolders(Number(req.params.userId));
    res.status(200).json(result);
  },

  getOneFile: async (req: Request, res: Response) => {
    const result = await dataMappers.getOneFile(
      Number(req.params.fileId),
      Number(req.params.userId),
    );

    res.status(200).json(result);
  },

  getOneFolder: async (req: Request, res: Response) => {
    const result = await dataMappers.getOneFolder(
      Number(req.params.folderId),
      Number(req.params.userId),
    );

    res.status(200).json(result);
  },
};

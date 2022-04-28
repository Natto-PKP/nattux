import type { NextFunction, Request, Response } from 'express';

import APIError from '../errors/APIError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log(req.method, req.url, error);

  if (error instanceof APIError) res.status(error.code).json({ code: error.code, message: `${error.message} (${req.url})` });
  else res.status(500).json({ code: 500, message: 'internal error' });
};

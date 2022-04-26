import jwt from 'jsonwebtoken';

import type { NextFunction, Request, Response } from 'express';

import APIError from '../errors/APIError';

export default (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) throw new APIError('this route require auth token', 403);

  jwt.verify(token, <string>process.env.JWT_SECRET);
  next();
};

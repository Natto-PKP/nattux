import { Router } from 'express';
import error from '../middlewares/error';

import users from './users';

const router = Router();

router.use('/users', users);

router.use((_req, res) => res.status(404).json({ code: 404, message: 'page not found' }));
router.use(error);

export default router;

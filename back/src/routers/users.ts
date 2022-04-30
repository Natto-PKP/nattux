import { Router } from 'express';
import multer from 'multer';

import desks from './users/desks';
import files from './users/files';
import folders from './users/folders';

import controllers from '../controllers/users';
import schemas from '../schemas/users';

import async from '../helpers/async';
import auth from '../middlewares/auth';
import validate from '../middlewares/validate';

const router = Router({ mergeParams: true });
const upload = multer();

router.use('/:userId(\\d+)/desks', desks);
router.use('/:userId(\\d+)/files', files);
router.use('/:userId(\\d+)/folders', folders);
router.use('/:userId(\\d+)/favorites');

router.delete('/:userId(\\d+)', auth, upload.none(), async(controllers.deleteOne));
router.get('/:userId(\\d+)', auth, upload.none(), async(controllers.getOne));
router.patch('/:userId(\\d+)', auth, upload.single('avatar'), validate(schemas.updateOne, 'body'), async(controllers.getOne));
router.post('/', upload.none(), validate(schemas.createOne, 'body'), async(controllers.createOne));
router.post('/token', upload.none(), validate(schemas.connect, 'body'), async(controllers.connect));

export default router;

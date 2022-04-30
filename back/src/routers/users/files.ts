import { Router } from 'express';
import multer from 'multer';

import controllers from '../../controllers/users/files';
import schemas from '../../schemas/users/files';

import async from '../../helpers/async';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';

const router = Router({ mergeParams: true });
const upload = multer();

router.delete('/:fileId(\\d+)', auth, upload.none(), async(controllers.deleteOne));
router.get('/', auth, upload.none(), async(controllers.getAll));
router.get('/:fileId(\\d+)', auth, upload.none(), async(controllers.getOne));
router.patch('/:fileId(\\d+)', auth, validate(schemas.updateOne, 'body'), async(controllers.updateOne));
router.post('/', auth, validate(schemas.createOne, 'body'), async(controllers.createOne));

export default router;

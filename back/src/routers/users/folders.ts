import { Router } from 'express';
import multer from 'multer';

import controllers from '../../controllers/users/folders';
import schemas from '../../schemas/users/folders';

import async from '../../helpers/async';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';

const router = Router({ mergeParams: true });
const upload = multer();

router.delete('/:folderId(\\d+)', auth, upload.none(), async(controllers.deleteOne));
router.get('/', auth, upload.none(), async(controllers.getAll));
router.get('/:folderId(\\d+)', auth, upload.none(), async(controllers.getOne));
router.get('/:folderId(\\d+)/files', auth, upload.none(), async(controllers.getFilesByFolder));
router.patch('/:folderId(\\d+)', auth, upload.none(), validate(schemas.updateOne, 'body'), async(controllers.updateOne));
router.post('/', auth, upload.none(), validate(schemas.createOne, 'body'), async(controllers.createOne));
router.post('/:folderId(\\d+)/files', auth, upload.none(), validate(schemas.createFileInFolder, 'body'), async(controllers.createFileInFolder));

export default router;

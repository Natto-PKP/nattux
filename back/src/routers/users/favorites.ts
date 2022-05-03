import { Router } from 'express';
import multer from 'multer';

import controllers from '../../controllers/users/favorites';

import async from '../../helpers/async';
import auth from '../../middlewares/auth';

const router = Router({ mergeParams: true });
const upload = multer();

router.get('/files', auth, upload.none(), async(controllers.getAllFiles));
router.get('/folders', auth, upload.none(), async(controllers.getAllFolders));
router.get('/files/fileId(\\d+)', auth, upload.none(), async(controllers.getOneFile));
router.get('/folders/folderId(\\d+)', auth, upload.none(), async(controllers.getOneFolder));

export default router;

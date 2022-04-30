import { Router } from 'express';
import multer from 'multer';

import controllers from '../../controllers/users/desks';
import schemas from '../../schemas/desks';

import async from '../../helpers/async';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';

const router = Router({ mergeParams: true });
const upload = multer();

router.delete('/:deskId(\\d+)', auth, upload.none(), async(controllers.deleteOne));
router.get('/:deskId(\\d+)', auth, upload.none(), async(controllers.getOne));
router.patch('/:deskId(\\d+)', auth, upload.single('background'), validate(schemas.updateOne, 'body'), async(controllers.updateOne));
router.post('/', auth, upload.none(), validate(schemas.createOne, 'body'), async(controllers.createOne));

export default router;

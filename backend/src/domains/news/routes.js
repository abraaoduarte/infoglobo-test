import express from 'express';
import {
  create,
  show,
  update,
  index,
  destroy,
} from './controller';

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', destroy);

export default router;

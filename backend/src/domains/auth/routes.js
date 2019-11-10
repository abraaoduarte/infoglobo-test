import express from 'express';
import {
  login,
  renew,
} from './controller';
import { lockForApi } from '../../auth';

const router = express.Router();

router.post('/login', login);
router.post('/renew', lockForApi(), renew);

export default router;

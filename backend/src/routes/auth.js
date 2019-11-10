import express from 'express';
import auth from 'domains/auth/routes';

const router = express.Router();

router.use('/', auth);

export default router;

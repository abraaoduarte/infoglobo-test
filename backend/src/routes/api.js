import express from 'express';

import news from 'domains/news/routes';

const router = express.Router();

router.use('/news', news);

export default router;

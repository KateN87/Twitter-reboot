import express from 'express';

import requireAuth from '../middleware/authorization.js';

const router = express.Router();

router.use(requireAuth);

router.get('/test', (req, res) => {
    res.status(200).send(req.user);
});

export default router;

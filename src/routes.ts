import { Router, Request, Response } from 'express';
import { getBalance, postReset } from './controllers/events';

const router: Router = Router();

router.get('/balance', (req, res) => {
    res.json(getBalance());
});

router.post('/reset', (req, res) => {
    res.status(200).json(postReset());
});

export default router;
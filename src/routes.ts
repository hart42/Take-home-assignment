import { Router, Request, Response } from 'express';
import { getBalance, postReset } from './controllers/events';

const router: Router = Router();

router.get('/balance', (req, res) => getBalance(req, res));

router.post('/reset', (req: Request, res: Response) => postReset(req, res));

export default router;
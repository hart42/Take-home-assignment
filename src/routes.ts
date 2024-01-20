import { Router, Request, Response } from 'express';
import { getBalance, postReset, events } from './controllers/events';

const router: Router = Router();

router.get('/balance', (req, res) => getBalance(req, res));

router.post('/reset', (req: Request, res: Response) => postReset(req, res));

router.post('/event', (req: Request, res: Response) => events(req, res));

export default router;
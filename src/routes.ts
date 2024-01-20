import { Router, Request, Response } from 'express';
import { getBalance, postReset, postDeposit, postWithdraw, postTransfer } from './controllers/events';

const router: Router = Router();

router.get('/balance', (req, res) => getBalance(req, res));

router.post('/reset', (req: Request, res: Response) => postReset(req, res));

router.post('/event', (req: Request, res: Response) => {
    const { type } = req.body;
    switch (type) {
        case 'deposit':
            postDeposit(req, res);
            break;
        
        case 'withdraw':
            postWithdraw(req, res);
            break;

        case 'transfer':
            postTransfer(req, res);
            break;
        default:
            res.status(404).json(0)
            break;
    }
})

export default router;
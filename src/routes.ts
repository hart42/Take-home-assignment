import {Router} from 'express';

const router: Router = Router();

router.get('/', (req, res) => {
    res.json('HELLO WORD!');
})

export default router;
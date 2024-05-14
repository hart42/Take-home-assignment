import request from 'supertest';
import app from '../../src/index';

describe('GET /balance', () => {
    it('should return 404 and value 0 for no-exist account', async () => {
        const response = await request(app).get('/balance').query({account_id: '120'});

        expect(response.status).toBe(404);
        expect(response.body).toEqual(0);
    });
})
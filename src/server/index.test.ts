import request from 'supertest';
import app from './index';

// TODO: Supertest isn't shutting down the server
describe('GET /api', () => {
  it('should get example API test', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toContain('Hello, world!');
  });
});
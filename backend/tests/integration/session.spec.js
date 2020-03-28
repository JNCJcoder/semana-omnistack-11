const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Session', () => {
  beforeAll(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Consegue se logar com o ID da ONG ?', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        id: '65bc04f6',
      })
      .expect(200);
  });
});

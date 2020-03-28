const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Profile', () => {
  beforeAll(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Consegue mostrar todos os Incidents de uma ONG ?', async () => {
    const responseOng = await request(app)
      .post('/sessions')
      .send({
        id: '65bc04f6',
      });

    const listIncidentsResponse = await request(app)
      .get('/profile')
      .set({ Authorization: 'Bearer ' + responseOng.body.token });

    expect(listIncidentsResponse.body).toEqual([
      {
        id: 2,
        title: 'Caso 1',
        description: 'Detalhes do caso',
        value: 120,
        ong_id: '65bc04f6',
      },
    ]);
  });
});

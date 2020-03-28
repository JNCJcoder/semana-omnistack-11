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
    const listIncidentsResponse = await request(app)
      .get('/profile')
      .set({ Authorization: '65bc04f6' });

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
